$(document).ready(function () {
    const individualHighs = { //team hight values
      points: { player: 'Giannis Zotalis', value: '22', note: 'Summer League 2024' },
      rebounds: { player: 'Georgios Bekris', value: '24', note: 'Winter League 2025' },
      assists: { player: 'Panagis Antzoulatos', value: '9', note: 'Summer League Playoff 2024' },
      blocks: { player: 'Panagiotis Damaskos ', value: '3', note: 'Winter League 2025' },
      steals: { player: 'Ioannis Sifakis ', value: '7', note: 'Winter League, 2025' },
      efficiency: {player: 'Panagiotis Damaskos', value: '41', note: 'Winter League 2025'}
    };
  
    $('#highsFilter').change(function () {
      const selected = $(this).val();
      if (individualHighs[selected]) { //function to insert the indivudual team highs in the table
        $('#highsTitle').text($(this).find('option:selected').text());
        $('#highsPlayer').text(individualHighs[selected].player);
        $('#highsValue').text(individualHighs[selected].value);
        $('#highsNote').text(individualHighs[selected].note);
        $('#individualHighs').show();
      } else {
        $('#individualHighs').hide();
      }
    });
  
    $('.sortable').click(function () {//function that sorts the stats table 
      const columnIndex = $(this).index();
      const rows = $('#statsTable tr').get();
      const isAscending = $(this).hasClass('asc');
  
      rows.sort(function (a, b) {
        const valA = parseFloat($(a).children('td').eq(columnIndex).text()) || 0;//This stores one value of the table in a float 
        const valB = parseFloat($(b).children('td').eq(columnIndex).text()) || 0;//This stores another value of the table in a float 
        return isAscending ? valA - valB : valB - valA;//sorts it
      });
  
      $.each(rows, function (index, row) {//changes the class of isAscending
        $('#statsTable').append(row);
      });
  
      $('.sortable').removeClass('asc desc');
      $(this).addClass(isAscending ? 'desc' : 'asc');
    });
  });
  