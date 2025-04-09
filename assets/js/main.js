document.addEventListener("DOMContentLoaded", () => {
  fetch("data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      const container = document.querySelector("#projectGrid");
      if (!container) return;

      projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "card";

        // الصورة الرئيسية
        const mainImage = document.createElement("img");
        mainImage.src = project.image;
        mainImage.alt = project.title;
        mainImage.className = "main-project-image";
        mainImage.style = "width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid #eee;";
        card.appendChild(mainImage);

        // باقي معلومات المشروع
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.style = "padding: 1rem;";
        cardBody.innerHTML = `
          <h4 style="font-size: 1.2rem; color: #fc466b; font-weight: bold;">${project.title}</h4>
          <p style="margin: 0.5rem 0; color: #555;">${project.description}</p>
          <a href="${project.link}" class="text-[#3498db] font-medium hover:underline">View Project</a>
        `;
        card.appendChild(cardBody);

        // الجاليري
        if (project.gallery && project.gallery.length > 0) {
          const galleryWrapper = document.createElement("div");
          galleryWrapper.className = "project-gallery";
          galleryWrapper.style = "display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 0.5rem; padding: 0.75rem 1rem;";

          project.gallery.forEach((img) => {
            const galleryImg = document.createElement("img");
            galleryImg.src = img;
            galleryImg.alt = `${project.title} preview`;
            galleryImg.style = "width: 100%; height: 60px; object-fit: cover; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05);";
            
            // 📌 هنا السحر
            galleryImg.addEventListener("click", () => {
              mainImage.src = img;
            });

            galleryWrapper.appendChild(galleryImg);
          });

          card.appendChild(galleryWrapper);
        }

        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Failed to load projects:", err));
});



// زر الموبايل
document.getElementById('menu-toggle')?.addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// تأثير Scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar?.classList.add('shadow-lg');
  } else {
    navbar?.classList.remove('shadow-lg');
  }
});
