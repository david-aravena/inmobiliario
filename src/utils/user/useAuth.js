"use client"
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from 'app/serverless/config';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
};

export default useAuth;
