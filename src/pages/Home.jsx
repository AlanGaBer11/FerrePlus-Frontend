import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Shield,
  Users,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import useProductStore from "@/context/ProductContext";
import "@/styles/home.css";

const Home = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts(1, 3);
  }, [fetchProducts]);

  const emailParams = {
    email: "alangaber11@gmail.com",
    subject: "Consulta FerrePlus",
    body: "Me gustaría obtener más información sobre sus productos...",
  };

  const handleEmailClick = () => {
    const mailtoLink = `mailto:${
      emailParams.email
    }?subject=${encodeURIComponent(
      emailParams.subject
    )}&body=${encodeURIComponent(emailParams.body)}`;

    window.location.href = mailtoLink;
  };

  const features = [
    {
      icon: <Wrench className="feature-icon" />,
      title: "Herramientas Profesionales",
      description: "Equipos de alta calidad para profesionales y aficionados",
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Garantía Extendida",
      description: "Respaldo completo en todos nuestros productos",
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Asesoría Experta",
      description: "Personal capacitado para guiarte en tu proyecto",
    },
    {
      icon: <Award className="feature-icon" />,
      title: "Calidad Certificada",
      description: "Productos de marcas reconocidas mundialmente",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <Badge className="hero-badge">Más de 10 años de experiencia</Badge>
            <h1 className="hero-title">
              Bienvenido a <span className="brand-name">FerrePlus</span>
            </h1>
            <p className="hero-description">
              Tu solución integral para herramientas, materiales de construcción
              y todo lo que necesitas para tus proyectos. Calidad garantizada y
              servicio excepcional.
            </p>
            <div className="hero-buttons">
              <Link to="/productos">
                <Button className="cta-primary">
                  Ver Productos
                  <ArrowRight className="button-icon" />
                </Button>
              </Link>
              <Button variant="outline" className="cta-secondary">
                Contáctanos
              </Button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <Wrench className="hero-card-icon" />
              <h3>Herramientas Profesionales</h3>
              <p>Calidad y durabilidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">¿Por qué elegir FerrePlus?</h2>
          <p className="section-description">
            Nos destacamos por nuestro compromiso con la calidad y el servicio
            al cliente
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <CardContent className="feature-content">
                <div className="feature-icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-description">
            Amplia gama de productos para todos tus proyectos
          </p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <Card key={product.id_product} className="product-card">
              <CardHeader className="product-header">
                <CardTitle className="product-title">{product.name}</CardTitle>
                <CardDescription className="product-description">
                  {product.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="product-content">
                <Link to="/productos">
                  <Button className="product-button" variant="outline">
                    Ver más
                    <ArrowRight className="button-icon" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3 className="stat-number">10+</h3>
            <p className="stat-label">Años de experiencia</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">5000+</h3>
            <p className="stat-label">Productos disponibles</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">1000+</h3>
            <p className="stat-label">Clientes satisfechos</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Soporte técnico</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Card className="cta-card">
          <CardContent className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">¿Listo para tu próximo proyecto?</h2>
              <p className="cta-description">
                Contacta con nuestros expertos y obtén asesoría personalizada
              </p>
            </div>
            <div className="cta-buttons">
              <Button className="cta-primary">
                <Phone className="button-icon" />
                Llamar ahora
              </Button>
              <Button
                variant="outline"
                className="cta-secondary"
                onClick={handleEmailClick}
              >
                <Mail className="button-icon" />
                Enviar email
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="contact-grid">
          <div className="contact-item">
            <Phone className="contact-icon" />
            <div>
              <h4 className="contact-title">Teléfono</h4>
              <p className="contact-detail">+52 449 188 9548</p>
            </div>
          </div>
          <div className="contact-item">
            <Mail className="contact-icon" />
            <div>
              <h4 className="contact-title">Email</h4>
              <p className="contact-detail">alangaber11@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <MapPin className="contact-icon" />
            <div>
              <h4 className="contact-title">Ubicación</h4>
              <p className="contact-detail">Aguascalientes, AGS</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
