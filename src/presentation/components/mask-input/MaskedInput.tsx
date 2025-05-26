// components/InputMask.tsx
import { forwardRef } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";

const MaskedPhoneInput = forwardRef<ReactInputMask, any>((props, ref) => (
  <InputMask {...props} ref={ref} mask="(99) 99999-9999" />
));

export default MaskedPhoneInput;
