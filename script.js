document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggles the mobile menu visibility
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dynamic Content Loading for Social Media Club ---

    // 1. Fetch Team Data and inject into #team-container
    function loadTeamData() {
        // Ensures path is relative to the index.html file
        fetch('./data/teams.json') 
            .then(response => {
                if (!response.ok) {
                    // Log error if file isn't found or server issue
                    throw new Error(`HTTP error! status: ${response.status} - Check if data/team.json exists.`);
                }
                return response.json();
            })
            .then(data => {
                const teamContainer = document.getElementById('team-container');
                data.team.forEach(member => {
                    const memberCard = `
                        <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center transform hover:scale-[1.02] transition duration-300 shadow-xl">
                            <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500">
                            <h4 class="text-xl font-bold">${member.name}</h4>
                            <p class="text-indigo-400 font-medium mb-2">${member.role}</p>
                            <p class="text-sm text-gray-400">${member.bio}</p>
                        </div>
                    `;
                    teamContainer.innerHTML += memberCard;
                });
            })
            .catch(error => console.error('Error loading team data:', error));
    }

    // 2. Fetch Roles Data and inject into #roles-container
    function loadRolesData() {
        // Ensures path is relative to the index.html file
        fetch('./data/teams.json') 
            .then(response => {
                if (!response.ok) {
                    // Log error if file isn't found or server issue
                    throw new Error(`HTTP error! status: ${response.status} - Check if data/roles.json exists.`);
                }
                return response.json();
            })
            .then(data => {
                const rolesContainer = document.getElementById('roles-container');
                data.roles.forEach(role => {
                    const roleCard = `
                        <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
                            <h3 class="text-xl font-semibold mb-3 gradient-text">${role.title}</h3>
                            <p class="text-gray-300 mb-2">${role.description}</p>
                            <ul class="list-disc list-inside text-sm text-gray-400 mt-3 space-y-1">
                                ${role.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    rolesContainer.innerHTML += roleCard;
                });
            })
            .catch(error => console.error('Error loading roles data:', error));
    }

    // Initialize data loading
    loadTeamData();
    loadRolesData();
});