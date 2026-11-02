import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: 'User',
  email: 'user@gmail.com',
  role: 'student',
  targetInstansi: 'Kemenkumham RI',
  targetScore: 450,
  joinedDate: '2026-01-15',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_user');
      if (saved) return JSON.parse(saved);
      return isSupabaseConfigured ? null : DEFAULT_USER;
    } catch {
      return isSupabaseConfigured ? null : DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_auth');
      if (saved !== null) return saved === 'true';
      return !isSupabaseConfigured; // hanya default true pada demo lokal tanpa backend
    } catch {
      return !isSupabaseConfigured;
    }
  });

  const [loading, setLoading] = useState(isSupabaseConfigured);

  // Ambil profil dari tabel profiles berdasarkan user id
  const fetchUserProfile = async (supabaseUser) => {
    if (!supabaseUser) return null;
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('Gagal memuat profil Supabase:', error);
      }

      return {
        id: supabaseUser.id,
        name: profile?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email,
        role: profile?.role || 'student',
        targetInstansi: profile?.target_instansi || 'Kemenkumham RI',
        targetScore: profile?.target_score || 450,
        isPro: profile?.is_pro || false,
        joinedDate: profile?.created_at ? profile.created_at.slice(0, 10) : '2026-01-15',
      };
    } catch (err) {
      console.warn('Error saat fetch profil Supabase:', err);
      return null;
    }
  };

  // Dengarkan perubahan sesi autentikasi Supabase jika dikonfigurasi
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Cek sesi aktif saat komponen mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        const profileUser = await fetchUserProfile(session.user);
        if (profileUser && isMounted) {
          setUser(profileUser);
          setIsAuthenticated(true);
        }
      } else if (isMounted) {
        setUser(null);
        setIsAuthenticated(false);
        try {
          localStorage.removeItem('bimbel_user');
          localStorage.removeItem('bimbel_auth');
        } catch (e) {
          console.warn(e);
        }
      }
      setLoading(false);
    });

    // Pasang listener status auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profileUser = await fetchUserProfile(session.user);
        if (profileUser && isMounted) {
          setUser(profileUser);
          setIsAuthenticated(true);
        }
      } else if (isMounted) {
        setUser(null);
        setIsAuthenticated(false);
        try {
          localStorage.removeItem('bimbel_user');
          localStorage.removeItem('bimbel_auth');
        } catch (e) {
          console.warn(e);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Simpan ke localStorage sebagai sinkronisasi offline
  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        localStorage.setItem('bimbel_user', JSON.stringify(user));
        localStorage.setItem('bimbel_auth', 'true');
      } else {
        localStorage.removeItem('bimbel_user');
        localStorage.setItem('bimbel_auth', 'false');
      }
    } catch (e) {
      console.warn('Gagal menyimpan status auth ke localStorage', e);
    }
  }, [user, isAuthenticated]);

  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;

      if (data?.user) {
        const profileUser = await fetchUserProfile(data.user);
        if (profileUser) {
          setUser(profileUser);
        }
      }
      setIsAuthenticated(true);
      return true;
    }

    // Fallback mode demo jika Supabase belum terkonfigurasi
    const newUser = {
      ...user,
      email: email || 'user@gmail.com',
      name: email ? email.split('@')[0] : 'User',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const register = async (userData) => {
    const { name, email, password, targetInstansi, targetScore } = userData;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password || '12345678',
        options: {
          data: {
            name: name || email.split('@')[0],
            target_instansi: targetInstansi || 'Kemenkumham RI',
            target_score: targetScore || 450,
          },
        },
      });
      if (error) throw error;

      const newUser = {
        ...DEFAULT_USER,
        id: data?.user?.id,
        name: name || (email ? email.split('@')[0] : 'User'),
        email: email || 'user@gmail.com',
        targetInstansi: targetInstansi || 'Kemenkumham RI',
        targetScore: targetScore || 450,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    }

    // Fallback mode demo
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Gagal logout dari Supabase:', err);
      }
    }
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('bimbel_user');
      localStorage.removeItem('bimbel_auth');
    } catch (e) {
      console.warn(e);
    }
  };

  const updateProfile = async (fields) => {
    if (isSupabaseConfigured && user?.id) {
      try {
        const dbFields = {};
        if (fields.name) dbFields.name = fields.name;
        if (fields.targetInstansi) dbFields.target_instansi = fields.targetInstansi;
        if (fields.targetScore) dbFields.target_score = fields.targetScore;
        if (fields.isPro !== undefined) dbFields.is_pro = fields.isPro;

        await supabase.from('profiles').update(dbFields).eq('id', user.id);
      } catch (err) {
        console.warn('Gagal memperbarui profil di Supabase:', err);
      }
    }
    setUser((prev) => ({ ...prev, ...fields }));
  };

  const signInWithGoogle = async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return data;
    }

    // Fallback mode demo
    const newUser = {
      ...DEFAULT_USER,
      name: 'Google User',
      email: 'calon.asn@gmail.com',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        signInWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

