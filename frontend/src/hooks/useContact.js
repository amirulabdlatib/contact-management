import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts, getContact, createContact, updateContact, deleteContact } from "../api/contact";

export const useContacts = () => {
    return useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    });
};

export const useContact = (id) => {
    return useQuery({
        queryKey: ["contacts", id],
        queryFn: () => getContact(id),
        enabled: !!id,
    });
};

export const useCreateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateContact(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            queryClient.invalidateQueries({ queryKey: ["contacts", variables.id] });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};
