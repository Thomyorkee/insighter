import "../../scss/custom-input.scss";

interface CustomInputProps {
  type: string;
  name?: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  value: string | number;
  handleChange?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
// label과 input을 조합한 input 컴포넌트
// prop으로 받아오는 타입에 따라 input의 종류 변경 (textarea, text, date, time 사용 중)
const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { type, name, label, maxLength, placeholder, value, handleChange } = props;
  /**
   * prop에 존재하는 타입에 따른 입력 필드 렌더링
   * @returns {JSX.Element} - 렌더링된 입력 필드
   */
  const inputFieldRenderer = () => {
    switch (type) {
      case "textarea":
        return (
          <div className="textarea_container">
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              maxLength={maxLength}
              placeholder={placeholder && placeholder}
              required
            />
            <div className="count">
              <span>{`${value ? value.toString().length : 0}`}</span>
              {`/${maxLength}`}
            </div>
          </div>
        );
      default:
        return (
          <input
            type={type}
            className="custom_input"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder && placeholder}
            required
          />
        );
    }
  };

  return (
    <div className="input-area">
      <p>{label && label}</p>
      {inputFieldRenderer()}
    </div>
  );
};

export default CustomInput;
