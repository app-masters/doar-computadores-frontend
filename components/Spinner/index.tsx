import { Circles } from 'react-loader-spinner';
import { SpinnerContainer } from './styles';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Circles
        height="80"
        width="80"
        color="#00b4ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </SpinnerContainer>
  );
};

export default Spinner;
