import { DialogContainer } from "../lib/MyLayout";

const Page = ({ header, children, footer }) => (
  <div className="Page">
    <header>{header}</header>
    <main>{children}</main>
    <footer>{footer}</footer>
    <DialogContainer />
  </div>
);

export default Page;
