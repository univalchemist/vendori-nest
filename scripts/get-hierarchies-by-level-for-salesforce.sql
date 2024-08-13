SELECT DISTINCT l.level, t.hierarchy_name FROM oem.oem_hierarchies t
LEFT JOIN oem.oem_hierarchy_levels l on l.hierarchy_level_id = t.hierarchy_level_id and l.hierarchy_type='Product Level'
WHERE t.company_id = 1 AND t.hierarchy_level_id in (select hierarchy_level_id from oem.oem_hierarchy_levels where hierarchy_type='Product Level')
ORDER BY l.level;
