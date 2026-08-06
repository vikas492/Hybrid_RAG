import { create } from "zustand";

interface DocumentState {
  search: string;
  setSearch: (search: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({ search: "", setSearch: (search) => set({ search }) }));
