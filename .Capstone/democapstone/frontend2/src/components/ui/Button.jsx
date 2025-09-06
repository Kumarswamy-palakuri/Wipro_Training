export default function Button({ variant = "ghost", children, style, ...props }) {
  const cls = ["btn"];
  if (variant === "primary") cls.push("btn-primary");
  if (variant === "danger") cls.push("btn-danger");
  return <button className={cls.join(" ")} style={style} {...props}>{children}</button>;
}
