import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import InputComponent from '~/InputComponent';
import Language from '~/./constants/language';
import { styles } from './style';
import { setFormatedDate } from '~/./utils/commonUtils';
import { FieldError } from 'react-hook-form';

interface DatePickerProps {
  open?: boolean;
  onChange?: (date: Date) => void;
  error?: FieldError;
}

const CustomDatePicker = (props: DatePickerProps) => {
  const { onChange,error } = props;
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <InputComponent
        optional={Language.Optional}
        label={Language.Birthdate}
        mainContainerStyle={styles.inputContainerStyle}
        isInput={false}
        txtPlaceholder={Language.Date}
        txtValue={date == null ? '' : setFormatedDate(date)}
        onTouchPress={() => setOpen(true)}
        error={error}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date ?? new Date()}
        onConfirm={(date) => {
          onChange(date);
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDatePicker;
