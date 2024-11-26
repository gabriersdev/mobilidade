-- Pesquisa de linhas no banco de dados
SELECT * FROM `lines` WHERE UPPER(line_name) LIKE UPPER('%%') OR UPPER(departure_location) LIKE UPPER('%%') OR UPPER(destination_location) LIKE UPPER('%%') LIMIT 30;

-- Pesquisa de linhas no banco de dados
SELECT l.`line_name`, dp.line_id FROM departure_points AS dp LEFT JOIN `lines` AS l ON dp.line_id = l.line_id WHERE address LIKE '%XXXX%' OR dp.observations LIKE '%XXXX%';
