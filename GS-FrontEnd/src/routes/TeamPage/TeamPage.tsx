import {
  FaGithub,
  FaLinkedin,
  FaUsers,
  FaIdCard,
  FaGraduationCap,
} from 'react-icons/fa';

interface TeamMember {
  name: string;
  rm: string;
  turma: string;
  image: string;
  github: string;
  linkedin: string;
}
export default function TeamPage() {
  const members: TeamMember[] = [
    {
      name: 'Felipe Monte de Sousa',
      rm: '562019',
      turma: '1TDSPH',
      image: '/img/foto-felipe.jpeg',
      github: 'https://github.com/Felipe-M-de-Sousa',
      linkedin: 'https://www.linkedin.com/in/felipe-sousa-761633356/',
    },
    {
      name: 'Aline Lourenço Carvalho',
      rm: '564538',
      turma: '1TDSPK',
      image: '/img/foto-aline.jpeg',
      github: 'https://github.com/LibaLourenco',
      linkedin: 'https://www.linkedin.com/in/aline-louren%C3%A7o-carvalho/',
    },
    {
      name: 'Luna de Carvalho Guimarães',
      rm: '562290',
      turma: '1TDSPH',
      image: '/img/foto-luna.jpeg',
      github: 'https://github.com/lunaguima',
      linkedin: 'https://www.linkedin.com/in/luna-guimar%C3%A3es-b0ba82309/',
    },
  ];

  return (
    <div className="team-container">
      <header className="team-header">
        <div className="team-icon-wrapper">
          <FaUsers />
        </div>
        <h1 className="team-title">Nossa Equipe</h1>
        <p className="team-subtitle">
          Conheça as mentes criativas e desenvolvedores por trás da tecnologia
          do FutureLens.
        </p>
      </header>
      <div className="team-grid">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <div className="photo-frame">
              <img
                src={member.image}
                alt={`Foto de ${member.name}`}
                className="member-photo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/avatar-padrao.png';
                }}
              />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p
              style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Desenvolvedor(a)
            </p>
            <div className="academic-info">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaIdCard /> RM
                </span>
                <strong>{member.rm}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaGraduationCap /> Turma
                </span>
                <strong>{member.turma}</strong>
              </div>
            </div>

            <div className="member-socials">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn social-github"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn social-linkedin"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
