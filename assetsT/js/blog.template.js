document.addEventListener("DOMContentLoaded", function () {
    // Generate TOC using only h2
    const tocList = document.getElementById("toc-list");
    const tocHeadings = document.querySelectorAll(".main-content-area h2");

    tocHeadings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;

        const li = document.createElement("li");
        li.style.marginLeft = "20px";

        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = heading.textContent;

        li.appendChild(link);
        tocList.appendChild(li);
    });

    // Calculate Read Time
    const content = document.getElementById("blog-content").textContent;
    const words = content.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const readTime = Math.ceil(words / wordsPerMinute);
    const readTimeElem = document.getElementById("read-time");

    if (readTimeElem) {
        readTimeElem.textContent = `🕒 ${readTime} min read`;
    }

    // Smooth scroll-based TOC highlighting using IntersectionObserver
    const tocLinks = tocList.querySelectorAll('a');
    const headings = document.querySelectorAll(".main-content-area h2");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -60% 0px", // Trigger when heading is ~40% from top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (entry.isIntersecting) {
                tocLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));

    // Scroll progress bar and sticky behavior
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }

        const heroSection = document.querySelector('.full-width-hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const progressBarWrapper = document.querySelector('.progress-bar-wrapper');

        if (progressBarWrapper) {
            if (scrollPosition >= heroHeight) {
                progressBarWrapper.style.position = 'fixed';
                progressBarWrapper.style.top = '0';
            } else {
                progressBarWrapper.style.position = 'absolute';
                progressBarWrapper.style.top = '100%';
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    window.copyToClipboard = function (button) {
        const code = button.closest('.code-container').querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            button.innerHTML = '<i class="bi bi-clipboard-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="bi bi-clipboard"></i>';
            }, 2000);
        });
    };
});

document.addEventListener("DOMContentLoaded", function () {
      const searchInput = document.getElementById("blogSearch");
      const categoryFilter = document.getElementById("categoryFilter");
      const clearFilters = document.getElementById("clearFilters");
      const blogCards = Array.from(document.querySelectorAll(".blog-card"));
      const paginationControls = document.getElementById("paginationControls");
      const noResults = document.getElementById("noResults");
      const cardsPerPage = 6;
      let currentPage = 1;

      function filterAndPaginate() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();

        const filteredCards = blogCards.filter(card => {
          const title = card.dataset.title;
          const category = card.dataset.category;
          return title.includes(searchText) && (selectedCategory === "" || category === selectedCategory);
        });

        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        blogCards.forEach(card => card.style.display = "none");
        filteredCards.slice(start, end).forEach(card => card.style.display = "block");

        noResults.style.display = filteredCards.length === 0 ? "block" : "none";
        renderPagination(totalPages);
      }

      function renderPagination(totalPages) {
        paginationControls.innerHTML = "";

        if (totalPages <= 1) return;

        const createButton = (label, page, disabled = false) => {
          const btn = document.createElement("button");
          btn.textContent = label;
          btn.className = `btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
          if (disabled) {
            btn.classList.add('btn-disabled');
            btn.disabled = true;
          }
          btn.onclick = () => {
            currentPage = page;
            filterAndPaginate();
          };
          return btn;
        };

        paginationControls.appendChild(createButton("« Prev", currentPage - 1, currentPage === 1));

        for (let i = 1; i <= totalPages; i++) {
          paginationControls.appendChild(createButton(i, i));
        }

        paginationControls.appendChild(createButton("Next »", currentPage + 1, currentPage === totalPages));
      }

      searchInput.addEventListener("input", () => {
        currentPage = 1;
        filterAndPaginate();
      });

      categoryFilter.addEventListener("change", () => {
        currentPage = 1;
        filterAndPaginate();
      });

      clearFilters.addEventListener("click", () => {
        searchInput.value = "";
        categoryFilter.value = "";
        currentPage = 1;
        filterAndPaginate();
      });

      filterAndPaginate();
    });