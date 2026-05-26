import React, { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "../firebase";

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  profilePhoto: string;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Sign in using Google Provider
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Ensure we immediately create or fetch user profile on success
      await syncUserProfile(firebaseUser);
    } catch (err: any) {
      console.error("Auth Sign-In Error: ", err);
      // Friendly, non-clinical error messages for the UI
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup closed before completion. Please try again.");
      } else if (err.code === "auth/blocked-by-popup-toggler") {
        setError("Popup blocked by browser. Please enable popups for this site.");
      } else {
        setError(err.message || "An authentication error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      console.error("Auth Logout Error: ", err);
      setError("Failed to log out cleanly. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check and Sync User Profile in Firestore
  const syncUserProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          uid: data.uid,
          name: data.name,
          email: data.email,
          profilePhoto: data.profilePhoto || "",
          createdAt: data.createdAt,
        });
      } else {
        // Document doesn't exist yet, so create it
        const newProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "InstaMocks User",
          email: firebaseUser.email || "",
          profilePhoto: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          createdAt: serverTimestamp(),
        };

        await setDoc(userDocRef, newProfile);
        
        setProfile({
          ...newProfile,
          createdAt: new Date(), // Local fallback till refetched
        });
      }
    } catch (err: any) {
      // Caught and converted into detailed JSON per security guidelines
      handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`);
    }
  };

  // Listen to Authentication State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          await syncUserProfile(firebaseUser);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err: any) {
        console.error("Authentication Sync Failed: ", err);
        setError("Active session sync with the server database failed.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, loginWithGoogle, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
