import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### Events

| name       | type                        | format                    | required |
|------------|-----------------------------|-----------------------|----------|
| id         | uuid                        | string                | true     |
| created_at | timestamp with time zone    | string                | true     |
| type       | text                        | string                | true     |
| start_time | timestamp without time zone | string                | true     |
| end_time   | timestamp without time zone | string                | false    |
| data       | json                        | object                | false    |
| comment    | text                        | string                | false    |
| kid        | uuid                        | string                | true     |

### Kids

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | uuid                     | string | true     |
| created_at | timestamp with time zone | string | true     |
| parent     | uuid                     | string | true     |
| name       | text                     | string | false    |
| image_url  | text                     | string | false    |

*/

// Events hooks
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('Events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['events', id],
    queryFn: () => fromSupabase(supabase.from('Events').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('Events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('Events').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Kids hooks
export const useKids = () => useQuery({
    queryKey: ['kids'],
    queryFn: () => fromSupabase(supabase.from('Kids').select('*')),
});

export const useKidsByParent = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return useQuery({
        queryKey: ['kidsByParent'],
        queryFn: async () => {
            if (!session?.user?.id) {
                throw new Error('User not authenticated');
            }
            return fromSupabase(supabase.from('Kids').select('*').eq('parent', session.user.id));
        },
        enabled: !!session?.user?.id,
    });
};

export const useKid = (id) => useQuery({
    queryKey: ['kids', id],
    queryFn: () => fromSupabase(supabase.from('Kids').select('*').eq('id', id).single()),
});

export const useAddKid = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newKid) => fromSupabase(supabase.from('Kids').insert([newKid])),
        onSuccess: () => {
            queryClient.invalidateQueries('kids');
        },
    });
};

export const useUpdateKid = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('Kids').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('kids');
        },
    });
};

export const useDeleteKid = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Kids').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('kids');
        },
    });
};

export const useKidsData = () => useQuery({
    queryKey: ['kidsData'],
    queryFn: () => fromSupabase(supabase.from('Kids').select('*')),
});
