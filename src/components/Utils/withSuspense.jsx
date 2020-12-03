import React from 'react';
import PropTypes from 'prop-types';
import { SuspenseWithPerf } from 'reactfire';
import Loading from './Loading';

function withSuspense(WrappedComponent) {
  return function withSuspenseComponent({ traceId = '', ...props }) {
    const loadingComponent = <Loading />;
    return (
      <SuspenseWithPerf fallback={loadingComponent} traceId={traceId}>
        <WrappedComponent {...props} />
      </SuspenseWithPerf>
    );
  };
}
withSuspense.propTypes = {
  traceId: PropTypes.string,
};
export default withSuspense;
