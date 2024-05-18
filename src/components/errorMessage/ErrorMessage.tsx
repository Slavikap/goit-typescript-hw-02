import { FC } from "react";

interface MessageProps {
  message: string | null;
}

const ErrorMessage: FC<MessageProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default ErrorMessage;