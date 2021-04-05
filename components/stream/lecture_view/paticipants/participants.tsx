export default function ParticipantsTable({ participants }) {
  return (
    <ul>
      {participants.map((participant) => (
        <li key={participant.id}>{participant.display}</li>
      ))}
    </ul>
  );
}
