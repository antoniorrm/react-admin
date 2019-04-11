import { types as coreTypes } from 'ra-core';

export interface FieldProps {
    addLabel?: boolean;
    basePath?: string;
    record?: coreTypes.Record;
    sortBy?: string;
    source?: string;
    label?: string;
    sortable?: boolean;
    className?: string;
    cellClassName?: string;
    headerClassName?: string;
    textAlign?: 'right' | 'left';
    translate?: (v: string) => string;
}
