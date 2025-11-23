import { useState, useEffect } from 'react';
import { FaChevronDown, FaVideo, FaClock, FaLayerGroup, FaRoad, FaLink } from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { Curso } from '../../types';

export default function TracksPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/java/curso`);
        if (response.ok) {
            const data = await response.json();
            setCursos(data);
        } else { throw new Error(); }
      } catch (error) {
        console.warn("Usando mock cursos");
        setCursos([
            { idCurso: 1, nomeDoCurso: "Java Full Stack", plataforma: "FIAP", cargaHoraria: 40, linkExterno: "#" },
            { idCurso: 2, nomeDoCurso: "React Avançado", plataforma: "Alura", cargaHoraria: 20, linkExterno: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);
  const trilhasAgrupadas = cursos.reduce((acc, curso) => {
    (acc[curso.plataforma] = acc[curso.plataforma] || []).push(curso);
    return acc;
  }, {} as Record<string, Curso[]>);
  if (loading) return <div style={{padding:40, textAlign:'center'}}>Carregando trilhas...</div>;
  return (
    <div className="tracks-container">
      <div className="tracks-header">
        <h1><FaRoad color="var(--primary-color)" /> Cursos e Trilhas</h1>
        <p style={{color: 'var(--text-muted)'}}>Conteúdo curado baseado nas demandas do mercado.</p>
      </div>
      <div className="tracks-list">
        {Object.keys(trilhasAgrupadas).map((plataforma, index) => {
          const cursosDaTrilha = trilhasAgrupadas[plataforma];
          const totalHoras = cursosDaTrilha.reduce((acc, c) => acc + c.cargaHoraria, 0);
          const isActive = expandedId === index;
          return (
            <div key={index} className={`track-card ${isActive ? 'active' : ''}`}>
              <div className="track-summary" onClick={() => setExpandedId(isActive ? null : index)}>
                <div className="track-info-left">
                  <span className="track-category">Parceiro Oficial</span>
                  <h3 className="track-title">Trilha {plataforma}</h3>
                  <div className="track-meta">
                    <div className="meta-item"><FaClock size={14} /> {totalHoras}h</div>
                    <div className="meta-item"><FaLayerGroup size={14} /> {cursosDaTrilha.length} cursos</div>
                  </div>
                </div>
                <FaChevronDown className="toggle-icon" />
              </div>
              {isActive && (
                <div className="track-modules">
                  <div className="timeline">
                    {cursosDaTrilha.map(curso => (
                      <div key={curso.idCurso} className="module-item">
                        <div className="status-icon-box" style={{borderColor:'var(--primary-color)'}}>
                           <FaVideo size={12} color="var(--primary-color)" />
                        </div>
                        <div className="module-card">
                          <div>
                            <h4 className="module-title">{curso.nomeDoCurso}</h4>
                            <div className="module-type">
                              {curso.plataforma} • {curso.cargaHoraria}h
                            </div>
                          </div>
                          <a href={curso.linkExterno} target="_blank" rel="noreferrer" className="btn-module-action btn-start-module" style={{textDecoration:'none', display:'flex', gap:6}}>
                            Acessar <FaLink />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}