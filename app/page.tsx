"use client"

import {
  Check,
  Star,
  Dumbbell,
  Heart,
  Stethoscope,
  ShoppingBag,
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export default function BenefitsCardPage() {
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Função para rolar suavemente até uma seção
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      // Adiciona um pequeno offset para considerar o header fixo
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Fechar o menu móvel após clicar
      if (isMobile) {
        setMobileMenuOpen(false)
      }
    }
  }

  // Configurar os links de âncora para usar rolagem suave
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")?.substring(1)
        if (targetId) {
          scrollToSection(targetId)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // Detect active section on scroll
    const handleScroll = () => {
      const sections = ["hero", "benefits", "pricing"]
      let current = ""

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section
            break
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/90 border-b border-orange-100 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="https://i.ibb.co/fYCL66t3/AEDUC-12.png"
              alt="Alfa Corretora"
              className="h-10 w-auto"
            />
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          ) : (
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className={`text-orange-700 hover:text-orange-900 hover:bg-orange-50 ${
                  activeSection === "benefits" ? "bg-orange-50 font-medium" : ""
                }`}
                onClick={() => scrollToSection("benefits")}
              >
                Benefícios
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-orange-700 hover:text-orange-900 hover:bg-orange-50 ${
                  activeSection === "pricing" ? "bg-orange-50 font-medium" : ""
                }`}
                onClick={() => scrollToSection("pricing")}
              >
                Planos
              </Button>
              <Button
                size="sm"
                className="bg-orange-gradient hover:opacity-90 transition-all rounded-full px-6"
                onClick={() => scrollToSection("pricing")}
              >
                Assinar Agora
              </Button>
            </nav>
          )}
        </div>

        {/* Menu móvel */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-3 border-b border-orange-100 animate-fade-in-up">
            <Button
              variant="ghost"
              className="justify-start text-orange-700 hover:text-orange-900 hover:bg-orange-50"
              onClick={() => scrollToSection("benefits")}
            >
              Benefícios
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-orange-700 hover:text-orange-900 hover:bg-orange-50"
              onClick={() => scrollToSection("pricing")}
            >
              Planos
            </Button>
            <Button
              className="bg-orange-gradient hover:opacity-90 transition-all rounded-full"
              onClick={() => scrollToSection("pricing")}
            >
              Assinar Agora
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-100 to-white relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-6 md:pr-8 animate-slide-in-left">
                <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600 w-fit">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  <span>Cartão de Benefícios Premium</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900">
                  Alfa Seguros <span className="text-orange-500 block">Benefícios Exclusivos</span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-[600px]">
                  Acesso ao GymPass(wellhub), Seguros, Plano odontológico, Consultas com psicólogos, Assistência
                  Jurídica, descontos em farmácias e muito mais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    className="bg-orange-gradient hover:opacity-90 transition-all rounded-full px-8 py-6 text-base"
                    onClick={() => scrollToSection("pricing")}
                  >
                    Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full px-8 py-6 text-base"
                    onClick={() => scrollToSection("benefits")}
                  >
                    Ver Benefícios
                  </Button>
                </div>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white"
                      >
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-900">+5.000</span> clientes satisfeitos
                  </p>
                </div>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="absolute inset-0 bg-orange-600 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border-2 border-white">
                  <img
                    src="https://i.ibb.co/DjM8H5p/AEDUC-13.png"
                    alt="Cartão de Benefícios Alfa Seguros"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-16 md:py-24 bg-orange-50/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>Benefícios Exclusivos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Vantagens Que <span className="text-orange-500">Transformam Sua Vida</span>
              </h2>
              <p className="max-w-[85%] text-gray-500 text-lg">
                Nosso cartão oferece vantagens que vão transformar sua experiência de cuidados com a saúde, compras e
                lazer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-3 mb-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 flex flex-col justify-center">
                      <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600 w-fit mb-4">
                        <Star className="h-3.5 w-3.5 mr-1" />
                        <span>Destaque</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">GymPass (wellhub)</h3>
                      <p className="text-gray-600 mb-6">
                        Acesso a uma ampla rede de academias e programas para cuidados com a saúde física e mental. Com
                        mais de 2.600 academias e studios parceiros em todo o Brasil, além de 42 apps de bem-estar.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="rounded-full bg-orange-100 p-1 mr-2">
                            <Check className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-gray-700">Acesso a academias em todo o país</span>
                        </li>
                        <li className="flex items-center">
                          <div className="rounded-full bg-orange-100 p-1 mr-2">
                            <Check className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-gray-700">Apps de meditação e bem-estar</span>
                        </li>
                        <li className="flex items-center">
                          <div className="rounded-full bg-orange-100 p-1 mr-2">
                            <Check className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-gray-700">Treinos online e ao vivo</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-orange-gradient flex items-center justify-center p-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 w-full max-w-md">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                          <Dumbbell className="h-10 w-10 text-white" />
                        </div>
                        <h4 className="text-white text-xl font-bold mb-2">Plano Starter do WellHub</h4>
                        <p className="text-white/80 mb-4">
                          Acesso completo a toda a rede de academias e aplicativos parceiros.
                        </p>
                        <Button
                          className="bg-white text-orange-600 hover:bg-orange-50 w-full"
                          onClick={() => scrollToSection("pricing")}
                        >
                          Conheça os planos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefit Cards */}
              <BenefitCard
                title="Seguro de Vida"
                description="Parceria com a Unimed Seguros: cobertura de R$10.000 para vida, acidentes pessoais, invalidez permanente e R$7.000 para assistência funeral."
                icon={<Heart className="h-6 w-6 text-orange-600" />}
              />

              <BenefitCard
                title="Plano Odontológico"
                description="Fornecido pela Unimed Seguros, com abrangência nacional, ampla rede credenciada e serviços como urgência, radiografia panorâmica, tratamento de canal e coroa unitária."
                icon={<Star className="h-6 w-6 text-orange-600" />}
              />

              <BenefitCard
                title="Telemedicina"
                description="Pronto Atendimento Digital com clínicos gerais, 24 horas por dia, 7 dias por semana. Inclui atendimentos psicológicos."
                icon={<Stethoscope className="h-6 w-6 text-orange-600" />}
              />

              <BenefitCard
                title="Descontos em Lojas"
                description="Oferecido pela Unimed Seguros, descontos em ampla rede de farmácias e lojas parceiras em todo o Brasil."
                icon={<ShoppingBag className="h-6 w-6 text-orange-600" />}
              />

              <BenefitCard
                title="Assistência Jurídica"
                description="Assistência jurídica oferecida pelo setor jurídico da Alfa Seguros exclusivamente para os seus associados."
                icon={<GraduationCap className="h-6 w-6 text-orange-600" />}
              />

              <BenefitCard
                title="Plano Pet"
                description="Cobertura para seus animais de estimação, incluindo consultas veterinárias e vacinas."
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-orange-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="M8 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="M16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="M16 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    <path d="M12 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>Nossos Planos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Escolha o Plano <span className="text-orange-500">Ideal para Você</span>
              </h2>
              <p className="max-w-[85%] text-gray-500 text-lg">
                Temos opções que se adaptam às suas necessidades e orçamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Plano Básico */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Card className="relative h-full flex flex-col border border-orange-100 shadow-lg bg-white overflow-hidden group-hover:shadow-2xl transition-all duration-300 rounded-2xl">
                  <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-6 pt-8 border-b border-orange-100">
                    <CardTitle className="text-2xl font-bold text-gray-900">Plano Básico</CardTitle>
                    <CardDescription className="text-center text-gray-500">Ideal para iniciantes</CardDescription>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl md:text-5xl font-bold text-orange-600">R$44,90</span>
                      <span className="text-gray-500 ml-2">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Odontológico</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Seguro de Vida</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Assistência Funeral</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Assistência Jurídica</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Telemedicina com Psicólogo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Desconto em lojas parceiras</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-6 px-6 sm:px-8 pb-8 border-t border-orange-100">
                    <a
                      href="https://pay.kiwify.com.br/OcLaqTk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all rounded-full">
                        Assinar Agora
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>

              {/* Plano Premium */}
              <div className="relative group md:-mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Card className="relative h-full flex flex-col border-none shadow-xl bg-white overflow-hidden group-hover:shadow-2xl transition-all duration-300 rounded-2xl">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-orange-gradient"></div>
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <div className="rounded-b-xl bg-orange-gradient px-4 py-1 text-xs font-medium text-white shadow-lg">
                      MAIS POPULAR
                    </div>
                  </div>
                  <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-6 pt-12 border-b border-orange-100">
                    <CardTitle className="text-2xl font-bold text-gray-900">Plano Premium</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                      Para quem busca mais vantagens
                    </CardDescription>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl md:text-5xl font-bold text-orange-600">R$99,90</span>
                      <span className="text-gray-500 ml-2">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Starter do WellHub</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">+ de 2.600 academias e studios</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">42 Apps de bem-estar</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Treinos on-line e ao vivo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Pet</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-6 px-6 sm:px-8 pb-8 border-t border-orange-100">
                    <a
                      href="https://pay.kiwify.com.br/2Hbo4pE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-orange-gradient hover:opacity-90 transition-all shadow-lg rounded-full">
                        Assinar Agora
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>

              {/* Plano VIP */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Card className="relative h-full flex flex-col border border-orange-100 shadow-lg bg-white overflow-hidden group-hover:shadow-2xl transition-all duration-300 rounded-2xl">
                  <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-6 pt-8 border-b border-orange-100">
                    <CardTitle className="text-2xl font-bold text-gray-900">Plano VIP</CardTitle>
                    <CardDescription className="text-center text-gray-500">Experiência completa</CardDescription>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl md:text-5xl font-bold text-orange-600">R$149,90</span>
                      <span className="text-gray-500 ml-2">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Starter do WellHub</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">+ de 2.600 academias e studios</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">42 Apps de bem-estar</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Treinos on-line e ao vivo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Pet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Plano Odontológico</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Seguro de Vida</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Assistência Funeral</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Assistência Jurídica</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Telemedicina com Psicólogo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-50 p-1">
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Desconto em lojas parceiras</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-6 px-6 sm:px-8 pb-8 border-t border-orange-100">
                    <a
                      href="https://pay.kiwify.com.br/cSxEkm9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all rounded-full">
                        Assinar Agora
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-orange-gradient relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-lg">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Pronto para Começar?</h2>
                <p className="text-orange-100 text-lg">
                  Junte-se a milhares de clientes satisfeitos e comece a aproveitar todos os benefícios hoje mesmo.
                </p>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white"
                      >
                        <Check className="h-4 w-4 text-orange-600" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-orange-100">
                    <span className="font-medium text-white">Sem taxas ocultas.</span> Cancele a qualquer momento.
                  </p>
                </div>
              </div>
              <div className="w-full max-w-md">
                <Button
                  className="w-full bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-6 text-lg"
                  onClick={() => scrollToSection("pricing")}
                >
                  Assine Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-orange-100 py-8 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="https://i.ibb.co/fYCL66t3/AEDUC-12.png"
                alt="Alfa Corretora"
                className="h-8 w-auto mr-2"
              />
              <p className="text-sm text-gray-500">© 2025 Alfa Corretora. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-orange-600 text-sm">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-600 text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-600 text-sm">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function BenefitCard({ title, description, icon }) {
  return (
    <Card className="bg-white border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-2xl h-full">
      <CardHeader className="pb-0">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

