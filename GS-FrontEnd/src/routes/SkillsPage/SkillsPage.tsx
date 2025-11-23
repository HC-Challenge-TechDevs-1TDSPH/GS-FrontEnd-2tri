import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaSave } from 'react-icons/fa';

interface Skill {
  id: number;
  nome: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
}

export default function SkillsPage() {
  const mockSuggestions: string[] = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'Docker',
    'AWS',
    'TypeScript',
    'Figma',
    'Scrum',
  ];
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, nome: 'React', nivel: 'avancado' },
    { id: 2, nome: 'Python', nivel: 'intermediario' },
    { id: 3, nome: 'Machine Learning', nivel: 'iniciante' },
  ]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    nome: '',
    nivel: 'iniciante',
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, nome: value });
    if (value.length > 0) {
      const filtered = mockSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  const selectSuggestion = (name: string) => {
    setFormData({ ...formData, nome: name });
    setSuggestions([]);
  };
  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ nome: '', nivel: 'iniciante' });
    setIsFormOpen(true);
  };
  const openEditForm = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({ nome: skill.nome, nivel: skill.nivel });
    setIsFormOpen(true);
    setSuggestions([]);
  };
  const handleCancel = () => {
    setIsFormOpen(false);
    setSuggestions([]);
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome) return alert('O nome da habilidade é obrigatório.');
    if (editingId) {
      console.log(`PUT /habilidades/${editingId}`, formData);
      setSkills((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item,
        ),
      );
      alert('Habilidade atualizada!');
    } else {
      console.log('POST /habilidades', formData);
      const newSkill: Skill = {
        id: Date.now(),
        ...formData,
      };
      setSkills([...skills, newSkill]);
      alert('Habilidade adicionada!');
    }
    setIsFormOpen(false);
  };
  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza?')) {
      console.log(`DELETE /habilidades/${id}`);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };
  const getBadgeClass = (nivel: string) => {
    switch (nivel) {
      case 'iniciante':
        return 'level-iniciante';
      case 'intermediario':
        return 'level-intermediario';
      case 'avancado':
        return 'level-avancado';
      default:
        return '';
    }
  };
  return (
    <div className="skills-page-container">
      <div className="skills-card">
        <div className="skills-header">
          <div className="skills-title">
            <h2>
              <FaLayerGroup /> Minhas Habilidades
            </h2>
            <p>Gerencie suas competências.</p>
          </div>
          {!isFormOpen && (
            <button className="btn-primary" onClick={openCreateForm}>
              <FaPlus /> Adicionar
            </button>
          )}
        </div>
        {isFormOpen && (
          <form className="skill-form" onSubmit={handleSave}>
            <div className="form-row">
              <div className="input-wrapper">
                <label>Nome da Skill</label>
                <input
                  type="text"
                  className="skill-input"
                  placeholder="Ex: React..."
                  value={formData.nome}
                  onChange={handleNameChange}
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((sug, index) => (
                      <li
                        key={index}
                        className="suggestion-item"
                        onClick={() => selectSuggestion(sug)}
                      >
                        {sug}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-wrapper" style={{ flex: '0 0 200px' }}>
                <label>Nível</label>
                <select
                  className="skill-select"
                  value={formData.nivel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nivel: e.target.value as Skill['nivel'],
                    })
                  }
                >
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                <FaSave /> Salvar
              </button>
            </div>
          </form>
        )}
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill.id} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.nome}</span>
                <span className={`level-badge ${getBadgeClass(skill.nivel)}`}>
                  {skill.nivel}
                </span>
              </div>
              <div className="item-actions">
                <button
                  className="btn-icon edit"
                  onClick={() => openEditForm(skill)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => handleDelete(skill.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};