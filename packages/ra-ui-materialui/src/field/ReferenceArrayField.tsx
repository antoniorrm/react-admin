import React, { Children, SFC } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import {
    ReferenceArrayFieldController,
    crudGetManyAccumulate as crudGetManyAccumulateAction,
} from 'ra-core';
import { types as coreTypes } from 'ra-core';
import { FieldProps } from './types';

const styles = createStyles({
    progress: { marginTop: '1em' },
});

interface ViewProps extends FieldProps, WithStyles<typeof styles> {
    ids: coreTypes.Identifier[];
    reference: string;
    referenceBasePath?: string;
    loadedOnce?: boolean;
    data?: any;
    crudGetManyAccumulate: coreTypes.Dispatch<
        typeof crudGetManyAccumulateAction
    >;
}

export const ReferenceArrayFieldView: SFC<ViewProps> = ({
    children,
    className,
    classes,
    data,
    ids,
    loadedOnce,
    reference,
    referenceBasePath,
}) => {
    if (loadedOnce === false) {
        return <LinearProgress className={classes.progress} />;
    }

    return React.cloneElement(Children.only(children), {
        className,
        resource: reference,
        ids,
        data,
        loadedOnce,
        basePath: referenceBasePath,
        currentSort: {},
    });
};

/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */

interface Props extends FieldProps, WithStyles<typeof styles> {
    ids: coreTypes.Identifier[];
    resource: string;
    reference: string;
    referenceBasePath?: string;
    loadedOnce?: boolean;
    data?: any;
    crudGetManyAccumulate: coreTypes.Dispatch<
        typeof crudGetManyAccumulateAction
    >;
    source: string;
    basePath: string;
    id: coreTypes.Identifier;
}
export const ReferenceArrayField: SFC<Props> = ({ children, ...props }) => {
    if (React.Children.count(children) !== 1) {
        throw new Error(
            '<ReferenceArrayField> only accepts a single child (like <Datagrid>)'
        );
    }

    return (
        <ReferenceArrayFieldController {...props}>
            {controllerProps => (
                <ReferenceArrayFieldView
                    {...props}
                    {...{ children, ...controllerProps }}
                />
            )}
        </ReferenceArrayFieldController>
    );
};

const EnhancedReferenceArrayField = withStyles(styles)(ReferenceArrayField);

EnhancedReferenceArrayField.defaultProps = {
    addLabel: true,
};

export default EnhancedReferenceArrayField;
