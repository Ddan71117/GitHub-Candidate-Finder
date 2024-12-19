import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleRemoveClick = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);

    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <header className="text-center mb-4">
        <h1>Saved Candidates</h1>
      </header>

      {savedCandidates.length === 0 ? (
        <p>There are currently no candidates for viewing.</p>
      ) : (
        <div className="container">
          <div className="row justify-content-evenly">
            {savedCandidates.map((candidate) => (
              <CandidateCard
                candidate={candidate}
                savedToPage={true}
                handleRemoveClick={handleRemoveClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SavedCandidates;
