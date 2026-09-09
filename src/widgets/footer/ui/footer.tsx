import { FooterLinkGroup } from "@/shared/ui"
import {
  footerBrand,
  footerCompanyLinks,
  footerContactLinks,
  footerLegal,
  footerResourceLinks,
} from "@/entities/company/model/footer-content"

export function Footer() {
  return (
    <footer className="dark bg-neutral-950">
      <div className="border-t border-border px-[18px] py-10 lg:px-[120px] lg:pt-[70px] lg:pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <div className="mb-3.5 text-xl font-bold text-foreground">
              {footerBrand.name}
            </div>
            <p className="whitespace-pre-line text-[13.5px] leading-loose text-muted-foreground">
              {footerBrand.description}
            </p>
          </div>

          <FooterLinkGroup title="COMPANY" links={footerCompanyLinks} />
          <FooterLinkGroup title="RESOURCES" links={footerResourceLinks} />
          <FooterLinkGroup title="CONTACT" links={footerContactLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-[22px] text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <span>
            © {footerLegal.companyName} · 사업자등록번호{" "}
            {footerLegal.businessRegistrationNumber} · VASP 등록번호{" "}
            {footerLegal.vaspRegistrationNumber}
          </span>
          <span>KO / EN</span>
        </div>
      </div>
    </footer>
  )
}
