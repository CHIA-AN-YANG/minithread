import { RootState } from '@/app/store/store';

export const selectParent = (state: RootState) => state.ui.parent;
export const selectContent = (state: RootState) => state.ui.content;
export const selectInputFormOpen = (state: RootState) => state.ui.inputForm;