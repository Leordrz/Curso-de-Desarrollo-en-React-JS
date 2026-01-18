export default function UsuarioCard({ usuario }) {
  const { name, email } = usuario;

  return (
    <article className="card">
      <div className="cardNombre">{name}</div>
      <div className="cardMail">{email}</div>
    </article>
  );
}
