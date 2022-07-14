// Configure the WideVine license template in JSON
// See the latest documentation and Widevine docs by Google for details

import { ContentKeyPolicyWidevineConfiguration } from '@azure/arm-mediaservices';

// https://docs.microsoft.com/azure/media-services/latest/widevine-license-template-overview
export const wideVineConfig: ContentKeyPolicyWidevineConfiguration = {
  odataType: '#Microsoft.Media.ContentKeyPolicyWidevineConfiguration',
  widevineTemplate: JSON.stringify({
    allowed_track_types: 'SD_HD',
    content_key_specs: [
      {
        track_type: 'SD',
        security_level: 1,
        required_output_protection: {
          HDCP: 'HDCP_NONE',
          // NOTE: the policy should be set to "HDCP_v1" (or greater) if you need to disable screen capture. The Widevine desktop
          // browser CDM module only blocks screen capture when HDCP is enabled and the screen capture application is using
          // Chromes screen capture APIs.
        },
      },
    ],
    policy_overrides: {
      can_play: true,
      can_persist: false,
      can_renew: false,
      // Additional OPTIONAL settings in Widevine template, depending on your use case scenario
      // license_duration_seconds: 604800,
      // rental_duration_seconds: 2592000,
      // playback_duration_seconds: 10800,
      // renewal_recovery_duration_seconds: <renewal recovery duration in seconds>,
      // renewal_server_url: "<renewal server url>",
      // renewal_delay_seconds: <renewal delay>,
      // renewal_retry_interval_seconds: <renewal retry interval>,
      // renew_with_usage: <renew with usage>
    },
  }),
};
