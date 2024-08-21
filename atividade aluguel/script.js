let data = [];

// Função para processar o arquivo CSV
document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                data = results.data.map(record => ({
                    day: parseInt(record.dia),
                    weather: parseInt(record.clima),
                    rentals: parseInt(record.alugueis)
                }));
                console.log('Dados carregados:', data); // Verifique os dados carregados
            },
            error: function(error) {
                console.error('Erro ao carregar CSV:', error);
            }
        });
    }
});

// Função para prever a quantidade de aluguéis
function predictRentals() {
    const day = parseInt(document.getElementById('day').value);
    const weather = parseInt(document.getElementById('weather').value);

    // Calcular a média de aluguéis para cada combinação de dia e clima
    let totalRentals = 0;
    let count = 0;

    data.forEach(record => {
        if (record.day === day && record.weather === weather) {
            totalRentals += record.rentals;
            count++;
        }
    });

    // Se não houver dados para essa combinação, usar a média geral
    if (count === 0) {
        totalRentals = data.reduce((sum, record) => sum + record.rentals, 0) / data.length;
    } else {
        totalRentals /= count;
    }

    document.getElementById('result').innerText = `Previsão de Aluguéis: ${Math.round(totalRentals)}`;
}