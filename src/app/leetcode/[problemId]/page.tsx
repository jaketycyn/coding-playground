interface ProblemIdProps {
  title: string;
  problemNumber: number;
}

const ProblemIdPage = ({ title, problemNumber }: ProblemIdProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <h2>{problemNumber}</h2>
    </div>
  );
};

export default ProblemIdPage;
