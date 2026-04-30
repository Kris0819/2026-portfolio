// HeroUI Web — Component Recreations
// Cosmetic-only recreations. CSS lives in kit.css.

const { useState, useEffect, useRef } = React;

// ---------- Icon (Lucide via inline SVG paths to avoid CDN flicker) ----------
const ICON_PATHS = {
  search: 'm21 21-4.34-4.34 M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18 M6 6l12 12',
  plus: 'M12 5v14 M5 12h14',
  arrow: 'M5 12h14 M12 5l7 7-7 7',
  chevron: 'm6 9 6 6 6-6',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
  home: 'M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1Z',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  trash: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  star: 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
  alert: 'M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z',
  info: 'M12 16v-4 M12 8h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
};

const Icon = ({ name, size = 18, color = 'currentColor', strokeWidth = 2, ...rest }) => {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: 'none' }} {...rest}>
      {d.split(' M').map((seg, i) => (
        <path key={i} d={(i === 0 ? seg : 'M' + seg)} />
      ))}
    </svg>
  );
};

// ---------- Button ----------
const Button = ({ variant = 'primary', size = 'md', icon, iconRight, children, className = '', ...props }) => {
  const cls = [
    'button',
    `button--${variant}`,
    size !== 'md' && `button--${size}`,
    !children && icon && 'button--icon-only',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} {...props}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </button>
  );
};

// ---------- TextField ----------
const TextField = ({ label, help, invalid, value, onChange, type = 'text', placeholder, ...rest }) => (
  <div className={`textfield${invalid ? ' textfield--invalid' : ''}`}>
    {label && <label className="textfield__label">{label}</label>}
    <input className="textfield__input" type={type} value={value || ''}
      onChange={onChange ? e => onChange(e.target.value) : undefined}
      placeholder={placeholder} {...rest} />
    {help && <span className="textfield__help">{help}</span>}
  </div>
);

// ---------- Card ----------
const Card = ({ children, className = '', size, style }) => (
  <div className={`card${size === 'lg' ? ' card--lg' : ''} ${className}`} style={style}>{children}</div>
);
Card.Title = ({ children }) => <h3 className="card__title">{children}</h3>;
Card.Subtitle = ({ children }) => <p className="card__subtitle">{children}</p>;

// ---------- Switch ----------
const Switch = ({ checked, onChange }) => (
  <button className="switch" data-selected={!!checked}
    onClick={() => onChange && onChange(!checked)} aria-pressed={!!checked} />
);

// ---------- Checkbox ----------
const Checkbox = ({ checked, onChange }) => (
  <span className="checkbox" data-selected={!!checked}
    onClick={() => onChange && onChange(!checked)} role="checkbox" aria-checked={!!checked} tabIndex={0} />
);

// ---------- Chip ----------
const Chip = ({ children, color = 'default' }) => (
  <span className={`chip chip--${color}`}>{children}</span>
);

// ---------- Avatar ----------
const Avatar = ({ name, size = 'md', color }) => {
  const initials = (name || '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const seed = (name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = seed * 47 % 360;
  return (
    <span className={`avatar${size !== 'md' ? ' avatar--' + size : ''}`}
      style={{ background: color || `oklch(0.62 0.18 ${hue})` }}>
      {initials}
    </span>
  );
};

// ---------- Tabs ----------
const Tabs = ({ items, value, onChange, variant = 'segment' }) => (
  <div className={`tabs${variant === 'underline' ? ' tabs--underline' : ''}`}>
    {items.map(it => (
      <button key={it.value} className="tabs__tab" data-selected={value === it.value}
        onClick={() => onChange && onChange(it.value)}>{it.label}</button>
    ))}
  </div>
);

// ---------- Slider ----------
const Slider = ({ value = 50, onChange, min = 0, max = 100 }) => {
  const ref = useRef();
  const dragging = useRef(false);
  const handle = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const pct = Math.max(0, Math.min(1, x / r.width));
    onChange && onChange(Math.round(min + pct * (max - min)));
  };
  useEffect(() => {
    const move = e => dragging.current && handle(e);
    const up = () => dragging.current = false;
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  });
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider">
      <div className="slider__track" ref={ref}
        onMouseDown={e => { dragging.current = true; handle(e); }}>
        <div className="slider__fill" style={{ width: pct + '%' }} />
        <div className="slider__thumb" style={{ left: pct + '%' }} />
      </div>
    </div>
  );
};

// ---------- Tooltip ----------
const Tooltip = ({ content, children, side = 'top' }) => {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="tooltip" style={{
          [side]: 'auto',
          bottom: side === 'top' ? '100%' : 'auto',
          top: side === 'bottom' ? '100%' : 'auto',
          left: '50%', transform: 'translateX(-50%)' + (side === 'top' ? ' translateY(-6px)' : ' translateY(6px)'),
        }}>{content}</span>
      )}
    </span>
  );
};

// ---------- Kbd ----------
const Kbd = ({ children }) => <span className="kbd">{children}</span>;

// ---------- Badge ----------
const Badge = ({ count, children, color = 'danger' }) => (
  <span className="badge-wrap">
    {children}
    {count != null && <span className="badge" style={{ background: `var(--${color})` }}>{count}</span>}
  </span>
);

// ---------- Modal ----------
const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true">
        {title && (
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 className="card__title">{title}</h3>
            <Button variant="tertiary" size="sm" icon="x" onClick={onClose} />
          </div>
        )}
        <div>{children}</div>
        {footer && <div style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </>
  );
};

// ---------- Select ----------
const Select = ({ value, onChange, options, placeholder = 'Select…' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const click = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  const sel = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button className="select" onClick={() => setOpen(o => !o)}>
        <span style={{ color: sel ? 'var(--field-foreground)' : 'var(--field-placeholder)' }}>
          {sel ? sel.label : placeholder}
        </span>
        <Icon name="chevron" size={16} color="var(--muted-foreground)" />
      </button>
      {open && (
        <div className="select-menu" style={{ marginTop: 4 }}>
          {options.map(o => (
            <div key={o.value} className="select-menu__item" data-selected={o.value === value}
              onClick={() => { onChange && onChange(o.value); setOpen(false); }}>
              {o.label}
              {o.value === value && <Icon name="check" size={14} color="var(--accent)" style={{ marginLeft: 'auto' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- Alert ----------
const Alert = ({ variant = 'info', title, children }) => {
  const stroke = {
    info: 'var(--accent)', success: 'oklch(0.5 0.16 152)',
    warning: 'oklch(0.55 0.15 70)', danger: 'var(--danger)',
  }[variant];
  const titleColor = {
    info: 'var(--accent-soft-foreground)', success: 'oklch(0.42 0.16 152)',
    warning: 'oklch(0.45 0.13 60)', danger: 'var(--danger-soft-foreground)',
  }[variant];
  const iconName = variant === 'success' ? 'check' : variant === 'danger' || variant === 'warning' ? 'alert' : 'info';
  return (
    <div className={`alert alert--${variant}`}>
      <Icon name={iconName} size={18} color={stroke} />
      <div>
        {title && <b style={{ color: titleColor }}>{title}</b>}
        <p>{children}</p>
      </div>
    </div>
  );
};

Object.assign(window, {
  Icon, Button, TextField, Card, Switch, Checkbox, Chip, Avatar,
  Tabs, Slider, Tooltip, Kbd, Badge, Modal, Select, Alert,
});
