import Reveal from './Reveal'

export default function SectionHeading({
  index,
  label,
  title,
  description,
  className = '',
  align = 'left',
}) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <div className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="text-white/35">{index}</span>
        <span className="h-px w-4 bg-white/20" />
        {label}
      </div>
      <h2 className="display-lg mt-5 text-white">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-[var(--color-muted-fg)] sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
