import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { BooleanField } from './BooleanField';

const defaultProps = {
    record: { published: true },
    source: 'published',
    resource: 'posts',
    translate: x => x,
    classes: {}
};

describe('<BooleanField />', () => {
    it('should display tick and truthy text if value is true', () => {
        const wrapper = shallow(<BooleanField {...defaultProps} />);
        assert.ok(wrapper.first().is('WithStyles(Typography)'));
        assert.equal(wrapper.first().find('pure(Done)').length, 1);
        assert.equal(
            wrapper
                .first()
                .find('span')
                .text(),
            'ra.boolean.true'
        );
    });

    it('should display tick and custom truthy text if value is true', () => {
        const wrapper = shallow(<BooleanField {...defaultProps} valueLabelTrue="Has been published" />);
        assert.ok(wrapper.first().is('WithStyles(Typography)'));
        assert.equal(wrapper.first().find('pure(Done)').length, 1);
        assert.equal(
            wrapper
                .first()
                .find('span')
                .text(),
            'Has been published'
        );
    });

    it('should display cross and falsy text if value is false', () => {
        const wrapper = shallow(<BooleanField {...defaultProps} record={{ published: false }} />);

        assert.ok(wrapper.first().is('WithStyles(Typography)'));
        assert.equal(wrapper.first().find('pure(Clear)').length, 1);
        assert.equal(
            wrapper
                .first()
                .find('span')
                .text(),
            'ra.boolean.false'
        );
    });

    it('should display tick and custom falsy text if value is true', () => {
        const wrapper = shallow(
            <BooleanField
                {...defaultProps}
                record={{ published: false }}
                valueLabelFalse="Has not been published yet"
            />
        );
        assert.ok(wrapper.first().is('WithStyles(Typography)'));
        assert.equal(wrapper.first().find('pure(Clear)').length, 1);
        assert.equal(
            wrapper
                .first()
                .find('span')
                .text(),
            'Has not been published yet'
        );
    });

    it('should not display anything if value is null', () => {
        const wrapper = shallow(<BooleanField {...defaultProps} record={{ published: null }} source="published" />);

        assert.equal(wrapper.first().children().length, 0);
    });

    it('should use custom className', () =>
        assert.deepEqual(
            shallow(<BooleanField {...defaultProps} record={{ foo: true }} source="foo" className="foo" />).prop(
                'className'
            ),
            'foo'
        ));

    it('should handle deep fields', () => {
        const wrapper = shallow(<BooleanField {...defaultProps} record={{ foo: { bar: true } }} source="foo.bar" />);
        assert.ok(wrapper.first().is('WithStyles(Typography)'));
        assert.equal(wrapper.first().find('pure(Done)').length, 1);
    });
});
