$(document).ready(function () {
    // Individual Highs Data (manually inputted)
    const individualHighs = {
      points: { player: 'Giannis Zotalis', value: '22', note: 'Summer League 2024' },
      rebounds: { player: 'Georgios Bekris', value: '24', note: 'Winter League 2025' },
      assists: { player: 'Panagis Antzoulatos', value: '9', note: 'Summer League Playoff 2024' },
      blocks: { player: 'Panagiotis Damaskos ', value: '3', note: 'Winter League 2025' },
      steals: { player: 'Ioannis Sifakis ', value: '7', note: 'Winter League, 2025' },
      efficiency: {player: 'Panagiotis Damaskos', value: '41', note: 'Winter League 2025'}
    };
  
    // Handle Individual Highs Filter
    $('#highsFilter').change(function () {
      const selected = $(this).val();
      if (individualHighs[selected]) {
        $('#highsTitle').text($(this).find('option:selected').text());
        $('#highsPlayer').text(individualHighs[selected].player);
        $('#highsValue').text(individualHighs[selected].value);
        $('#highsNote').text(individualHighs[selected].note);
        $('#individualHighs').show();
      } else {
        $('#individualHighs').hide();
      }
    });
  
    // Handle Sorting for Season Stats
    $('.sortable').click(function () {
      const columnIndex = $(this).index();
      const rows = $('#statsTable tr').get();
      const isAscending = $(this).hasClass('asc');
  
      rows.sort(function (a, b) {
        const valA = parseFloat($(a).children('td').eq(columnIndex).text()) || 0;
        const valB = parseFloat($(b).children('td').eq(columnIndex).text()) || 0;
        return isAscending ? valA - valB : valB - valA;
      });
  
      $.each(rows, function (index, row) {
        $('#statsTable').append(row);
      });
  
      // Toggle ascending/descending class
      $('.sortable').removeClass('asc desc');
      $(this).addClass(isAscending ? 'desc' : 'asc');
    });
  });
  