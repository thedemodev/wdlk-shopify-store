export declare type vendorTypes = 'facebook' | 'google';
export interface TrackingProps {
    facebook: boolean;
    google: boolean;
    disableTracking(vendor: string): void;
}
export declare function TrackingManagerFactory(): TrackingProps;
export default function tracking(): void;
