import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithubUser } from "../api/API";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export interface CandidateCardProps {
  candidate: Candidate;
  handleSkipClick?: () => void;
  handleSaveClick?: () => void;
  handleRemoveClick?: (login: string) => void;
  savedToPage?: boolean;
}

function CandidateCard({
  candidate,
  handleSkipClick,
  handleSaveClick,
  handleRemoveClick,
  savedToPage,
}: CandidateCardProps) {
  const [candidateDetails, setCandidateDetails] = useState<Candidate | null>(
    null
  );

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await searchGithubUser(candidate.login);
      setCandidateDetails(details);
    };
    fetchDetails();
  }, [candidate]);

  const saveButton = !savedToPage && handleSaveClick && (
    <Button
      variant="success"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleSaveClick}
    >
      <span style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        +
      </span>
    </Button>
  );

  const skipButton = !savedToPage && handleSkipClick && (
    <Button
      variant="danger"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleSkipClick}
    >
      <span style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        -
      </span>
    </Button>
  );

  const deleteButton = savedToPage && handleRemoveClick && (
    <Button
      variant="danger"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => handleRemoveClick(candidate.login)}
    >
      <span style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        x
      </span>
    </Button>
  );

  return (
    <Card
      className="rounded-4 bg-transparent border-0 shadow-sm"
      style={{ width: "288px", margin: "40px 0" }}
    >
      <Card.Img
        variant="top"
        className="rounded-top-4 shadow-sm"
        src={candidateDetails?.avatar_url}
      />
      <Card.Body className="bg-black rounded-bottom-4 shadow-sm">
        <Card.Title className="text-white text-bold fw-bolder text-center mb-4">
          <div>{candidateDetails?.name}</div>
          <div>({candidateDetails?.login || "No user provided"})</div>
        </Card.Title>
        <Card.Text className="text-white shadow-sm">
          <p>
            Location: {candidateDetails?.location || "No location provided."}
          </p>
          <p>
            Email:{" "}
            <a
              href={candidateDetails?.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidateDetails?.html_url}
            </a>
          </p>
          <p>Company: {candidateDetails?.company || "No company provided."}</p>
          <p>Bio: {candidateDetails?.bio || "No bio provided."}</p>
        </Card.Text>{" "}
        <div className="pt-3 border-top">
          <div className="d-flex justify-content-between">
            {skipButton}
            {saveButton}
          </div>
          {deleteButton && (
            <div className="d-flex justify-content-center mt-3">
              {deleteButton}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CandidateCard;
