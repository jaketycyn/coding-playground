import NewProblemForm from "../_components/NewProblemForm";

export default function createProblemPage() {
  return (
    <div className="flex items-center flex-col mt-10 space-y-4">
      <h1 className="text-4xl ">Create New Problem</h1>
      <NewProblemForm />
    </div>
  );
}
