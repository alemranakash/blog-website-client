

const Footer = () => {
    return (
        <div>
       <footer className="footer p-10  text-base-content">
  <aside>
<img className="w-24" src="https://i.ibb.co/NyrBnY9/20231106-234848.png" alt="" />
    <p className="font-semibold text-lg">Sarkari Blog</p><p className="text-base">A unique blog site since 2006</p>
  </aside> 
  <nav>
    <header className="footer-title ">Category</header> 
    <a className="link link-hover font-medium">Education</a> 
    <a className="link link-hover font-medium">Health</a> 
    <a className="link link-hover font-medium">Technology</a> 
    <a className="link link-hover font-medium">EntertainMent</a>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover font-medium">About us</a> 
    <a className="link link-hover font-medium">Contact</a> 
    <a className="link link-hover font-medium">Jobs</a> 
    <a className="link link-hover font-medium">Press kit</a>
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover font-medium">Terms of use</a> 
    <a className="link link-hover font-medium">Privacy policy</a> 
    <a className="link link-hover font-medium">Cookie policy</a>
  </nav>
</footer>
        </div>
    );
};

export default Footer;