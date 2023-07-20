import { SpinnerCircular } from 'spinners-react';
import './spinner.css';

export default function Loading() {
  return (
    <div className="container mt-[25%] flex justify-center">
      <SpinnerCircular enabled={true} size="25%" color="#000000" />
    </div>
  );
}
