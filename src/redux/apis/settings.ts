import { baseApi } from './base';

export interface ISettings {
  enableMaintenance: boolean;
}

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<ISettings, void>({
      query: () => ({
        url: '/settings/maintenance',
      }),
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
