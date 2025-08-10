import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, Target, Award, Shield, Wrench } from "lucide-react";
import "@/styles/about.css";

const About = () => {
  const values = [
    {
      icon: <Shield className="value-icon" />,
      title: "Calidad",
      description:
        "Garantizamos productos de alta calidad para nuestros clientes",
    },
    {
      icon: <Wrench className="value-icon" />,
      title: "Experiencia",
      description: "Más de 10 años en el mercado de herramientas y ferretería",
    },
    {
      icon: <Users className="value-icon" />,
      title: "Servicio",
      description: "Atención personalizada y asesoramiento experto",
    },
    {
      icon: <Target className="value-icon" />,
      title: "Compromiso",
      description:
        "Enfocados en satisfacer las necesidades de nuestros clientes",
    },
  ];

  return (
    <div className="page-container">
      <div className="max-width-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Nosotros</h1>
          <p className="hero-description">
            En FerrePlus, nos dedicamos a proporcionar las mejores herramientas
            y soluciones para tus proyectos, con un compromiso inquebrantable
            con la calidad y el servicio al cliente.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision-section">
          <Card className="mission-vision-card">
            <CardContent className="card-content">
              <div className="card-header">
                <Briefcase className="section-icon" />
                <h2 className="card-title">Misión</h2>
              </div>
              <p className="card-text">
                Proporcionar soluciones integrales en ferretería y herramientas,
                garantizando la más alta calidad y servicio excepcional para
                satisfacer las necesidades de nuestros clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="mission-vision-card">
            <CardContent className="card-content">
              <div className="card-header">
                <Award className="section-icon" />
                <h2 className="card-title">Visión</h2>
              </div>
              <p className="card-text">
                Ser la empresa líder en el sector ferretero, reconocida por
                nuestra excelencia en servicio, innovación y compromiso con el
                desarrollo sostenible.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="values-section">
          <h2 className="values-title">Nuestros Valores</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <Card key={index} className="value-card">
                <CardContent className="card-content">
                  <div className="value-icon-container">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="card-text">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">¿Listo para trabajar con nosotros?</h2>
            <p className="cta-description">
              Descubre nuestra amplia gama de productos y servicios. Estamos
              aquí para ayudarte en tus proyectos.
            </p>
            <button className="cta-button">Contáctanos</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
