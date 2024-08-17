type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <div>Error: {message}</div>;
}
