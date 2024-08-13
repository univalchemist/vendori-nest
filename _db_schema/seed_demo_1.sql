
insert into oem.oem_companies (company_id, company_name, company_email, logo_url, default_quote_expiration, bank_name, bank_account_number, bank_routing_number, phone, deal_attributes, settings, permit_credit_cards, is_permit_signing, is_enabled, created_at, updated_at, subdomain, email_domain, website_url)
values  (1, 'Demo & Co.', 'Demo_Admin@vendori.com', 'https://files.vendori.com/images/c2c895e3-53f1-4de6-8fdc-232cf29f7486.png?Expires=1715867213&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvYzJjODk1ZTMtNTNmMS00ZGU2LThmZGMtMjMyY2YyOWY3NDg2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxNTg2NzIxM319fV19&Signature=AtEXbbkIw2Vzevks3oQI5bISt6AP4C5vn8IXKz4Pa1cKsJ9GYEYQDu5dAlWaBRmdUBzPxJC5AflGUSFpkrvk1NPjoczEWZspD4kwDx1MkjbBy6r5OYpVIE6WhArU~hWj-OSBMkVbsMhDMPCLA2TGfMCnpgP1PXigdGx4H0JdJOMVJPjuEFESePmZ97FX~y9Sg8eOCihXm2VWrb4OHfVtyodaquWS240VJ8nDUwAyvl8L3Wb4kC6e30COPIamhLW0r6KnoVNJs43JGljC08CoIYN0plTnAjYiQ83ul0kmL3bOX4xnd6COklfojKsheUBoHEKXQJmPpv0zCoV9CtGm-Q__&Key-Pair-Id=K3W4UV0J4B6YE7', 90, 'Local Bank #1', '01234567890', '123456789', '+1 (123) 456-7890', '{Net New,Expansion,Renewal,Custom Billing,Custom Discount}', '{"companyPrimaryColor": {"a": 1, "b": 226, "g": 144, "r": 74}, "customListPriceName": "List Price", "defaultPaymentTerms": "2 Net 30", "startingQuoteNumber": 101, "customCustomerPriceName": "Price To Customer"}', 'All Products', true, true, '2023-02-27 17:18:52.491218 +00:00', '2023-02-27 17:18:52.491218 +00:00', 'demo', 'bloodandtreasure,vendori', 'www.vendori.com');

insert into oem.oem_hierarchy_levels (hierarchy_level_id, company_id, level_name, hierarchy_type, level, is_editable, is_enabled, created_at, updated_at, is_active, is_global)
values  (1, 1, 'Continent', 'User Geography', 1, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (2, 1, 'Country', 'User Geography', 2, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (3, 1, 'Region', 'User Geography', 3, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (4, 1, 'City', 'User Geography', 4, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (7, 1, 'Geo LV-7', 'User Geography', 7, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', false, false),
        (8, 1, 'Geo LV-8', 'User Geography', 8, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', false, false),
        (5, 1, 'District', 'User Geography', 5, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', false, false),
        (6, 1, 'Geo LV-6', 'User Geography', 6, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', false, false),
        (13, 1, 'Product LV-5', 'Product Level', 5, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (14, 1, 'Product LV-6', 'Product Level', 6, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (15, 1, 'Product LV-7', 'Product Level', 7, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (17, 1, 'Global', 'User Geography', 0, true, true, '2023-05-04 00:57:08.520399 +00:00', '2023-05-04 00:57:08.520399 +00:00', true, true),
        (11, 1, 'Product LV-3', 'Product Level', 3, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (12, 1, 'Product LV-4', 'Product Level', 4, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (10, 1, 'Product LV-2', 'Product Level', 2, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (9, 1, 'Product LV-1', 'Product Level', 1, false, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', true, false),
        (18, 1, 'Global ', 'Product Level', 0, true, true, '2023-05-04 00:57:08.520399 +00:00', '2023-05-04 00:57:08.520399 +00:00', false, true),
        (16, 1, 'Product LV-8', 'Product Level', 8, true, true, '2023-02-27 17:18:52.515244 +00:00', '2023-02-27 17:18:52.515244 +00:00', false, false);

insert into oem.oem_hierarchies (hierarchy_id, hierarchy_level_id, company_id, parent_id, hierarchy_name, is_enabled, is_active, created_at, updated_at, mpath)
values  (1, 1, 1, 158, 'North America', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (11, 1, 1, 158, 'Europe', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (18, 1, 1, 158, 'Asia', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (186, 9, 1, 1, 'Hardware', true, true, '2023-05-15 17:29:20.484204 +00:00', '2023-05-15 17:29:20.484204 +00:00', '158.186.'),
        (187, 9, 1, 1, 'Consulting Services', true, true, '2023-05-15 17:29:25.174318 +00:00', '2023-05-15 17:29:25.174318 +00:00', '158.187.'),
        (190, 10, 1, 187, 'Onshore', true, true, '2023-05-16 13:48:52.805716 +00:00', '2023-05-16 13:48:52.805716 +00:00', '158.187.190.'),
        (193, 11, 1, 190, 'Developer (Jr.)', true, true, '2023-05-16 13:49:29.232422 +00:00', '2023-05-16 13:49:29.232422 +00:00', '158.187.190.193.'),
        (160, 9, 1, 1, 'Software', true, true, '2023-05-05 16:05:54.915155 +00:00', '2023-05-05 16:05:54.915155 +00:00', '158.160.'),
        (194, 11, 1, 191, 'Developer (Jr.)', true, true, '2023-05-16 13:49:32.815572 +00:00', '2023-05-16 13:49:32.815572 +00:00', '158.187.191.194.'),
        (195, 11, 1, 192, 'Developer (Jr.)', true, true, '2023-05-16 13:49:35.409327 +00:00', '2023-05-16 13:49:35.409327 +00:00', '158.187.192.195.'),
        (2, 2, 1, 1, 'USA', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (4, 3, 1, 2, 'Central', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (5, 4, 1, 3, 'New York', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (6, 4, 1, 4, 'Ohio', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (7, 5, 1, 1, 'District', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (8, 6, 1, 1, 'Geo LV-6', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (9, 7, 1, 1, 'Geo LV-7', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (10, 8, 1, 1, 'Geo LV-8', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (13, 2, 1, 11, 'Ukraine', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (12, 2, 1, 11, 'UK', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (16, 4, 1, 14, 'London', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (17, 4, 1, 15, 'Kyiv', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (19, 2, 1, 18, 'China', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (3, 3, 1, 2, 'East', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (114, 2, 1, 1, 'Canada', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (199, 4, 1, 123, 'Berlin', true, true, '2023-05-30 18:02:28.719529 +00:00', '2023-05-30 18:02:28.719529 +00:00', '158.199.'),
        (15, 3, 1, 13, 'West', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (14, 3, 1, 12, 'England', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (115, 3, 1, 2, 'West', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (165, 10, 1, 160, 'OnPremise', true, true, '2023-05-05 16:09:25.314133 +00:00', '2023-05-05 16:09:25.314133 +00:00', '158.160.165.'),
        (116, 3, 1, 114, 'East', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (117, 3, 1, 114, 'Central', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (118, 3, 1, 114, 'West', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (119, 2, 1, 11, 'Germany', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (120, 2, 1, 11, 'France', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (173, 11, 1, 164, 'Premium', true, true, '2023-05-05 16:17:01.304638 +00:00', '2023-05-05 16:17:01.304638 +00:00', '158.160.164.173.'),
        (174, 11, 1, 165, 'Standard', true, true, '2023-05-05 16:17:04.806420 +00:00', '2023-05-05 16:17:04.806420 +00:00', '158.160.165.174.'),
        (175, 11, 1, 165, 'Premium', true, true, '2023-05-05 16:17:08.311616 +00:00', '2023-05-05 16:17:08.311616 +00:00', '158.160.165.175.'),
        (178, 11, 1, 164, 'Premium', true, true, '2023-05-05 16:18:40.392205 +00:00', '2023-05-05 16:18:40.392205 +00:00', '158.160.164.178.'),
        (188, 10, 1, 186, 'Computers', true, true, '2023-05-16 13:48:42.241532 +00:00', '2023-05-16 13:48:42.241532 +00:00', '158.186.188.'),
        (189, 10, 1, 186, 'Peripherals', true, true, '2023-05-16 13:48:46.563587 +00:00', '2023-05-16 13:48:46.563587 +00:00', '158.186.189.'),
        (191, 10, 1, 187, 'Near-Shore', true, true, '2023-05-16 13:48:58.289740 +00:00', '2023-05-16 13:48:58.289740 +00:00', '158.187.191.'),
        (192, 10, 1, 187, 'Off-Shore', true, true, '2023-05-16 13:49:02.469242 +00:00', '2023-05-16 13:49:02.469242 +00:00', '158.187.192.'),
        (164, 10, 1, 160, 'SaaS', true, true, '2023-05-05 16:07:34.740296 +00:00', '2023-05-05 16:07:34.740296 +00:00', '158.160.164.'),
        (196, 11, 1, 190, 'Architect (Sr.)', true, true, '2023-05-16 13:49:42.451788 +00:00', '2023-05-16 13:49:42.451788 +00:00', '158.187.190.196.'),
        (121, 2, 1, 18, 'Japan', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (125, 4, 1, 122, 'Edinburgh', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (122, 3, 1, 12, 'Scotland', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (126, 4, 1, 124, 'Paris', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (127, 4, 1, 115, 'San Francisco', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (128, 4, 1, 116, 'Montreal', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (129, 4, 1, 117, 'Toronto', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (130, 4, 1, 118, 'Vancouver', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (158, 17, 1, null, 'Global', true, true, '2023-05-04 00:57:08.520399 +00:00', '2023-05-04 00:57:08.520399 +00:00', '158.'),
        (154, 2, 1, 1, 'Mexico', true, true, '2023-03-08 17:47:07.963187 +00:00', '2023-03-08 17:47:07.963187 +00:00', '158.154.'),
        (197, 11, 1, 191, 'Architect (Sr.)', true, true, '2023-05-16 13:49:44.900767 +00:00', '2023-05-16 13:49:44.900767 +00:00', '158.187.191.197.'),
        (198, 11, 1, 192, 'Architect (Sr.)', true, true, '2023-05-16 13:49:47.181285 +00:00', '2023-05-16 13:49:47.181285 +00:00', '158.187.192.198.'),
        (123, 3, 1, 119, 'Central', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (124, 3, 1, 120, 'North', true, true, '2023-02-27 17:18:52.535288 +00:00', '2023-02-27 17:18:52.535288 +00:00', '158.'),
        (172, 11, 1, 164, 'Standard', true, true, '2023-05-05 16:16:58.519939 +00:00', '2023-05-05 16:16:58.519939 +00:00', '158.160.164.172.');

insert into oem.oem_roles (role_id, priority, company_id, role_name, role_type, data_access, create_access, is_active, is_export_right, is_enabled, created_at, updated_at)
values  (10, 6, 1, 'C-Suite', 'Workflow Approver', 'Assigned Only', 'View Only', true, false, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00'),
        (2, 1, 1, 'Admin', 'Admin', 'All', 'All', true, true, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00'),
        (4, 3, 1, 'Deal Desk', 'Workflow Approver', 'Team & Sub-Hierarchy', 'All', true, true, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00'),
        (5, 4, 1, 'Sales Mgt.', 'Workflow Approver', 'All', 'All', true, true, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00'),
        (1, 5, 1, 'Sales', 'Quote Creator', 'Assigned Only', 'All', true, false, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00'),
        (3, 2, 1, 'External', 'Quote Creator', 'Assigned Only', 'All', true, false, true, '2023-02-27 17:18:52.557098 +00:00', '2023-02-27 17:18:52.557098 +00:00');

insert into oem.oem_users (user_id, company_id, geo_hierarchy_id, role_id, organization_id, pre_populated_fields, image_url, first_name, last_name, notification_email, sso_login_email, phone, is_external, is_enabled, region, time_zone_area, is_hide_welcome_text, is_active, created_at, updated_at, company_channel_id, company_organisation_name, sf_user_id)
values  (14, 1, 1, 2, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Beth', 'Waldman', 'beth@vendori.com', 'beth@vendori.com', '1234567890', false, true, 'N/A', 'US/Pacific', true, true, '2023-04-07 13:53:16.105412 +00:00', '2023-04-07 13:53:16.105412 +00:00', null, null, null),
        (26, 1, 18, 2, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Christine', 'Demo', 'christine@bloodandtreasure.com', 'christine@bloodandtreasure.com', '09478970785', false, true, 'N/A', 'US/Pacific', false, true, '2023-05-04 12:21:58.873030 +00:00', '2023-05-04 12:21:58.873030 +00:00', null, null, null),
        (2, 1, 1, 2, 'a6xir2hq', '{Full Name}', 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Demo', 'Admin', 'Demo_admin@vendori.com', 'Demo_admin@vendori.com', '+1 (234) 567-8900', false, true, 'New York', 'America/New_York', true, true, '2023-02-27 17:18:52.570477 +00:00', '2023-02-27 17:18:52.570477 +00:00', null, null, null),
        (8, 1, 4, 1, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Sales', 'User', 'demo_sales@vendori.com', 'demo_sales@vendori.com', '1234123123', false, true, 'N/A', 'US/Pacific', false, true, '2023-03-03 04:22:10.239096 +00:00', '2023-03-03 04:22:10.239096 +00:00', null, null, null),
        (5, 1, 1, 3, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'E', 'G', 'ethan@vendori.com', 'ethan@vendori.com', '', false, true, 'N/A', 'US/Pacific', false, true, '2023-03-01 02:18:57.679919 +00:00', '2023-03-01 02:18:57.679919 +00:00', null, 'Vendo', null),
        (19, 1, 2, 2, null, '{Full Name}', 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Oscar', 'Vendori', 'oscar+vendori+1@bloodandtreasure.com', 'oscar+vendori+1@bloodandtreasure.com', null, false, true, 'America/Los_Angeles', 'America/Los_Angeles', true, true, '2023-04-10 08:43:59.787412 +00:00', '2023-04-10 08:43:59.787412 +00:00', null, null, null),
        (25, 1, 1, 2, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Phil', 'Naess', 'phil@vendori.com', 'phil@vendori.com', '1234567890', false, true, 'N/A', 'America/New_York', false, true, '2023-05-02 16:18:49.286922 +00:00', '2023-05-02 16:18:49.286922 +00:00', null, null, null),
        (22, 1, 1, 3, '1', null, 'https://files.vendori.com/images/f7fb8fe3-6f06-4838-9a40-5a039f84d246.png?Expires=1712945053&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvZjdmYjhmZTMtNmYwNi00ODM4LTlhNDAtNWEwMzlmODRkMjQ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxMjk0NTA1M319fV19&Signature=aMDCnPfo1jp6tNC0cfQxH24CYXUrc2UqqCIkVmR9TcPSEDyrCakWnrb3FVVGjozemsLeWo-p5QiVxhJPZzFoqQPfoCgEVLBijxp~dYUYA19-h2~5SfOdIW5vQba7Sgtj2BSZYVg9SU81lxQCwtgoe0ClPp8nPFwh1sGd~R3T-7HXGnv8~pcZ26VtVG0Ii407XPWOIhNYurTLCAkwQ2pwBBnHjOeW7C4roTbDKEolXeLkV01B0xnlL6OuI5uIxq2USLvGns1I9tDTQyzkh8teo3dwT-u3kz-HbS-PX~q7F9acGc5YfrzQuV8BtSpMqRNdTErNTg~~qPswLyxnLS3Bug__&Key-Pair-Id=K3W4UV0J4B6YE7', 'Demo', 'g', 'rich@bloodandtreasure.com', 'rich@bloodandtreasure.com', '', false, true, 'N/A', 'US/Pacific', false, true, '2023-04-11 13:07:07.586913 +00:00', '2023-04-11 13:07:07.586913 +00:00', null, '', null);

insert into oem.oem_addresses (address_id, address_1, address_2, address_3, city, zip_code, region, country, phone, email, is_enabled, created_at, updated_at, company_id, address_type)
values  (2, 'Suite 370', 'Suite 060', 'Apt. 859', 'Laverneburgh', '43922', 'New York', 'Borders', '+1 929 276-6530', 'Bette.Rath41@gmail.com', true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Shipping'),
        (3, 'Apt. 841', 'Apt. 487', 'Suite 403', 'Olathe', '50518', 'Hawaii', 'Bedfordshire', '+1 929 277-3626', 'Effie18@hotmail.com', true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Billing'),
        (4, 'Apt. 105', 'Suite 278', 'Suite 921', 'Marvinfort', '21200-6337', 'Alaska', 'Bedfordshire', '+1 929 279-4151', 'Bailey_Hamill77@gmail.com', true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Shipping'),
        (7, '70 SW Century Dr #1019 Bend OR 97702', null, null, 'New York City', '97702', 'OR', 'United States', '929-248-0000', null, true, '2023-02-28 09:46:38.478797 +00:00', '2023-02-28 09:46:38.478797 +00:00', 1, 'Billing'),
        (8, '70 SW Century Dr #1019 Bend OR 97702', null, null, 'New York City', '97702', 'OR', 'United States', '929-248-0000', null, true, '2023-02-28 09:46:38.478797 +00:00', '2023-02-28 09:46:38.478797 +00:00', 1, 'Shipping'),
        (5, '70 SW Century Dr #1019 Bend OR 97702', null, '', 'New York City', '97702', 'OR', 'United States', '929-248-0000', null, true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Billing'),
        (6, '70 SW Century Dr #1019 Bend OR 97702', null, '', 'New York City', '97702', 'OR', 'United States', '929-248-0000', null, true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Shipping'),
        (1, '1 Main Street', 'Apt. 101', '', 'Springfield', '12345', 'Georgia', 'United States', '+1 (123) 456-7890', 'info@vendori.com', true, '2023-02-27 17:18:52.500279 +00:00', '2023-02-27 17:18:52.500279 +00:00', 1, 'Billing');

insert into oem.oem_approval_queue_priorities (approval_queue_priority_id, company_id, role_id, priority, is_active, is_enabled, created_at, updated_at)
values  (5, 1, 10, 3, true, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00'),
        (7, 1, 4, 2, true, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00'),
        (4, 1, 5, 1, true, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00'),
        (1, 1, 1, 4, false, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00'),
        (3, 1, 3, 6, false, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00'),
        (2, 1, 2, 5, false, true, '2023-02-27 17:18:52.889272 +00:00', '2023-02-27 17:18:52.889272 +00:00');

insert into oem.oem_channels (channel_id, logo_url, name, website, contact_name, contact_email, contact_phone, is_active, is_enabled, created_at, updated_at)
values  (1, 'http://loremflickr.com/640/480', 'Eva''s Partner', 'https://pleasant-zoo.biz', 'Emery', 'Telly28@gmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (2, 'http://loremflickr.com/640/480', 'Adalberto''s Partner', 'https://everlasting-sac.biz', 'Travon', 'Turner74@hotmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (3, 'http://loremflickr.com/640/480', 'Freda''s Partner', 'https://white-mistake.net', 'Marina', 'Shaina.Dare53@hotmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (4, 'http://loremflickr.com/640/480', 'Martine''s Partner', 'https://abandoned-transition.com', 'Jaleel', 'Ottilie.Cummings89@gmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (5, 'http://loremflickr.com/640/480', 'Mortimer''s Partner', 'https://tidy-jewel.net', 'Duane', 'Hollie_Price54@gmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (6, 'http://loremflickr.com/640/480', 'Serenity''s Partner', 'https://webbed-octave.com', 'Kristopher', 'Liam_Stokes@hotmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (7, 'http://loremflickr.com/640/480', 'Shane''s Partner', 'https://wretched-duel.net', 'Sophia', 'Samanta.Sipes87@yahoo.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (8, 'http://loremflickr.com/640/480', 'Furman''s Partner', 'https://gentle-torte.net', 'Mustafa', 'Elinore49@hotmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (9, 'http://loremflickr.com/640/480', 'Wayne''s Partner', 'http://fatal-inn.name', 'Lolita', 'Lucas.Hessel@gmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00'),
        (10, 'http://loremflickr.com/640/480', 'Theresa''s Partner', 'http://swift-corps.biz', 'Myron', 'Kenna_Ankunding@hotmail.com', '+1 (123) 456-7890', true, true, '2023-02-27 17:18:52.575345 +00:00', '2023-02-27 17:18:52.575345 +00:00');

insert into oem.oem_licensing_programs (licensing_program_id, licensing_program_type, licensing_program_name, company_id, discount, is_enabled, created_at, updated_at)
values  (1, 'Customer', 'dogsled', 1, 0.1, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (2, 'Reseller', 'manifestation', 1, 0.1, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (3, 'Distributor', 'commuter', 1, 0.1, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (4, 'Reseller', 'exception', 1, 0.2, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (5, 'Distributor', 'pecan', 1, 0.2, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (6, 'Reseller', 'chop', 1, 0.3, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (7, 'Distributor', 'soot', 1, 0.3, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (8, 'Reseller', 'sundial', 1, 0.4, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (9, 'Distributor', 'site', 1, 0.4, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (10, 'Reseller', 'target', 1, 0.5, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (11, 'Distributor', 'metaphor', 1, 0.5, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (12, 'Reseller', 'elderberry', 1, 0.6, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (13, 'Distributor', 'enforcement', 1, 0.6, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (14, 'Reseller', 'berry', 1, 0.7, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (15, 'Distributor', 'grey', 1, 0.7, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (16, 'Reseller', 'nutmeg', 1, 0.8, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (17, 'Distributor', 'overload', 1, 0.8, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (18, 'Reseller', 'observatory', 1, 0.9, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (19, 'Distributor', 'trailer', 1, 0.9, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (20, 'Reseller', 'ruin', 1, 0.1, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00'),
        (21, 'Distributor', 'telescreen', 1, 0.1, true, '2023-02-27 17:18:52.591337 +00:00', '2023-02-27 17:18:52.591337 +00:00');

insert into oem.oem_company_addresses (company_id, address_id, created_at, is_enabled)
values  (1, 1, '2023-02-27 17:18:52.507378 +00:00', true);

insert into oem.oem_company_channel_settings (company_channel_setting_id, logo_url, channel_id, company_id, name, website, contact_name, contact_email, contact_phone, is_enabled, created_at, updated_at)
values  (7, 'http://loremflickr.com/640/480', 4, 1, 'Bob''s Partner', 'https://abandoned-transition.com', 'Alvera', 'distributor4@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.656329 +00:00', '2023-02-27 17:18:52.656329 +00:00'),
        (8, 'http://loremflickr.com/640/480', 4, 1, 'Bob''s Partner', 'https://abandoned-transition.com', 'Nelda', 'reseller4@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.664355 +00:00', '2023-02-27 17:18:52.664355 +00:00'),
        (9, 'http://loremflickr.com/640/480', 5, 1, 'Bob''s Partner', 'https://tidy-jewel.net', 'Ruthe', 'distributor5@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.674173 +00:00', '2023-02-27 17:18:52.674173 +00:00'),
        (10, 'http://loremflickr.com/640/480', 5, 1, 'Bob''s Partner', 'https://tidy-jewel.net', 'Jany', 'reseller5@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.683183 +00:00', '2023-02-27 17:18:52.683183 +00:00'),
        (11, 'http://loremflickr.com/640/480', 6, 1, 'Bob''s Partner', 'https://webbed-octave.com', 'Seamus', 'distributor6@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.692090 +00:00', '2023-02-27 17:18:52.692090 +00:00'),
        (12, 'http://loremflickr.com/640/480', 6, 1, 'Bob''s Partner', 'https://webbed-octave.com', 'Madilyn', 'reseller6@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.699853 +00:00', '2023-02-27 17:18:52.699853 +00:00'),
        (13, 'http://loremflickr.com/640/480', 7, 1, 'Bob''s Partner', 'https://wretched-duel.net', 'Dewayne', 'distributor7@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.709122 +00:00', '2023-02-27 17:18:52.709122 +00:00'),
        (14, 'http://loremflickr.com/640/480', 7, 1, 'Bob''s Partner', 'https://wretched-duel.net', 'Milo', 'reseller7@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.726607 +00:00', '2023-02-27 17:18:52.726607 +00:00'),
        (15, 'http://loremflickr.com/640/480', 8, 1, 'Bob''s Partner', 'https://gentle-torte.net', 'Larry', 'distributor8@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.735424 +00:00', '2023-02-27 17:18:52.735424 +00:00'),
        (16, 'http://loremflickr.com/640/480', 8, 1, 'Bob''s Partner', 'https://gentle-torte.net', 'Chloe', 'reseller8@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.744492 +00:00', '2023-02-27 17:18:52.744492 +00:00'),
        (17, 'http://loremflickr.com/640/480', 9, 1, 'Bob''s Partner', 'http://fatal-inn.name', 'Alexander', 'distributor9@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.753228 +00:00', '2023-02-27 17:18:52.753228 +00:00'),
        (18, 'http://loremflickr.com/640/480', 9, 1, 'Bob''s Partner', 'http://fatal-inn.name', 'Bryana', 'reseller9@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.761895 +00:00', '2023-02-27 17:18:52.761895 +00:00'),
        (19, 'http://loremflickr.com/640/480', 10, 1, 'Bob''s Partner', 'http://swift-corps.biz', 'Amira', 'distributor10@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.769599 +00:00', '2023-02-27 17:18:52.769599 +00:00'),
        (20, 'http://loremflickr.com/640/480', 10, 1, 'Bob''s Partner', 'http://swift-corps.biz', 'Alford', 'reseller10@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.776732 +00:00', '2023-02-27 17:18:52.776732 +00:00'),
        (1, 'http://loremflickr.com/640/480', 1, 1, 'Distributor 1', 'https://pleasant-zoo.biz', 'Misael', 'distributor1@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.600373 +00:00', '2023-05-16 14:46:43.622023 +00:00'),
        (2, 'http://loremflickr.com/640/480', 1, 1, 'Reseller 1', 'https://pleasant-zoo.biz', 'Kay', 'reseller1@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.609190 +00:00', '2023-05-16 14:46:52.501200 +00:00'),
        (3, 'http://loremflickr.com/640/480', 2, 1, 'Distributor 2', 'https://everlasting-sac.biz', 'Hannah', 'distributor2@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.616794 +00:00', '2023-05-16 14:47:04.847757 +00:00'),
        (4, 'http://loremflickr.com/640/480', 2, 1, 'Reseller 2', 'https://everlasting-sac.biz', 'Hulda', 'reseller2@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.625402 +00:00', '2023-05-16 14:47:10.105615 +00:00'),
        (5, 'http://loremflickr.com/640/480', 3, 1, 'Distributor 3', 'https://white-mistake.net', 'Ahmad', 'distributor3@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.634479 +00:00', '2023-05-16 14:47:18.280190 +00:00'),
        (6, 'http://loremflickr.com/640/480', 3, 1, 'Reseller 3', 'https://white-mistake.net', 'Alexa', 'reseller3@vendori.com', '+1 (123) 456-7890', true, '2023-02-27 17:18:52.647534 +00:00', '2023-05-16 14:47:26.759581 +00:00');

insert into oem.oem_company_programs (company_program_id, company_id, channel_id, name, is_enabled, created_at, updated_at)
values  (1, 1, 1, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (2, 1, 1, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (3, 1, 2, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (4, 1, 2, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (5, 1, 3, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (6, 1, 3, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (7, 1, 4, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (8, 1, 4, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (9, 1, 5, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (10, 1, 5, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (11, 1, 6, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (12, 1, 6, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (13, 1, 7, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (14, 1, 7, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (15, 1, 8, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (16, 1, 8, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (17, 1, 9, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (18, 1, 9, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (19, 1, 10, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00'),
        (20, 1, 10, 'NA', true, '2023-02-27 17:18:52.579756 +00:00', '2023-02-27 17:18:52.579756 +00:00');

insert into oem.oem_company_channels (company_channel_id, company_id, company_channel_setting_id, geo_hierarchy_id, company_program_id, channel_type, is_active, is_enabled, created_at, updated_at, licensing_program_id)
values  (2, 1, 2, 2, 2, 'Reseller', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-02-27 17:18:52.784108 +00:00', 3),
        (3, 1, 3, 11, 3, 'Distributor', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-02-27 17:18:52.784108 +00:00', 4),
        (4, 1, 4, 18, 4, 'Reseller', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-02-27 17:18:52.784108 +00:00', 5),
        (5, 1, 5, 114, 5, 'Distributor', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-02-27 17:18:52.784108 +00:00', 6),
        (6, 1, 6, 19, 6, 'Reseller', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-02-27 17:18:52.784108 +00:00', 7),
        (1, 1, 1, 1, 1, 'Distributor', true, true, '2023-02-27 17:18:52.784108 +00:00', '2023-05-16 14:46:58.428918 +00:00', 2);

insert into oem.oem_discount_rules (discount_rule_id, company_id, owner_user_id, discount_rule_name, discount_rule_logic, discount_rule_type, is_enabled, is_active, created_at, updated_at, start_date, end_date)
values  (9, 1, 2, 'Demo_QtyOver10_5%Channel', '{"antecedent": [{"unit": "units", "scope": "quantity", "value": "10", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "greater-than"}], "consequent": [{"value": "10", "scopeCriteria": "apply-discount-of", "operationCriteria": "to-the-following-discount-element", "operationCriteriaValue": 3, "appliedOperationCriteria": "choose-highest-discount"}]}', 'Channel', true, true, '2023-05-30 17:39:18.202072 +00:00', '2023-05-30 17:39:18.202072 +00:00', '2023-05-30 17:38:48.131000 +00:00', null),
        (8, 1, 2, 'Demo_QTYOver10_5%Customer', '{"antecedent": [{"unit": "units", "scope": "quantity", "value": "10", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "greater-than"}], "consequent": [{"value": "5", "scopeCriteria": "apply-discount-of", "operationCriteria": "to-the-following-discount-element", "operationCriteriaValue": 1, "appliedOperationCriteria": "choose-highest-discount"}]}', 'Customer', true, true, '2023-05-30 17:38:43.562601 +00:00', '2023-05-30 17:38:43.562601 +00:00', '2023-05-30 17:37:57.386000 +00:00', null);

insert into oem.oem_discounts (discount_id, company_id, name, priority, discount_type, applicable_to, position, is_enabled, is_active, created_at, updated_at)
values  (1, 1, 'Customer Program Discount', 1, 'Program', 'Customer', 'List Price', true, true, '2023-02-27 17:18:52.810718 +00:00', '2023-02-27 17:18:52.810718 +00:00'),
        (2, 1, 'Customer Discretionary Discount', 2, 'Discretionary', 'Customer', 'List Price', true, true, '2023-02-27 17:18:52.810718 +00:00', '2023-02-27 17:18:52.810718 +00:00'),
        (3, 1, 'Channel Program Discount', 3, 'Program', 'Channel', 'Customer Price', true, true, '2023-02-27 17:18:52.810718 +00:00', '2023-02-27 17:18:52.810718 +00:00'),
        (4, 1, 'Channel Discretionary Discount', 4, 'Discretionary', 'Channel', 'Customer Price', true, true, '2023-02-27 17:18:52.810718 +00:00', '2023-02-27 17:18:52.810718 +00:00');

insert into oem.oem_materials (material_id, material_name, file_url, is_required, package_position, is_enabled, created_at, updated_at, applicable_to, company_id)
values  (6, 'Vertical Cover', 'https://files.vendori.com/pdf/a8e5144d-3b16-4557-9800-c9bbb6a01e01.pdf?Expires=1718114514&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvYThlNTE0NGQtM2IxNi00NTU3LTk4MDAtYzliYmI2YTAxZTAxLnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODExNDUxNH19fV19&Signature=ejum5eL3F4vlBnUK-cv3Ck6QK2c5iZh6AW4vV8P4iV84BeljDl1Bm71isy4cjNgYXAQQYyP7EiTx8iSDVQMu-c1rKR9lf~CcG6BKQAvZkhXu-UX2FQnpqjpIiRBp-YTj5i8mYocyhjSUrXCXkSbsoz8yvMP8HnGptvClqFRgRmN5N-ZvQ2nHGRIKkAhGa3Sf3BtxC-OEfg7I81ey1ZwY4v82ICv1t6A5CKxc0lfWEz6jCecpsFA9TYm4P1W45BfnW8kvJudpJN2C3cqu0HqLpPWh-SXRpX9TX7tUmW1ovi6koG-ozNdT1k9QBe76st2GqH1KZkI-MbHLe6r0-Ilx8w__&Key-Pair-Id=K3W4UV0J4B6YE7', false, 'Before', true, '2023-06-11 14:01:55.311564 +00:00', '2023-06-11 14:01:55.311564 +00:00', 'Both', 1),
        (9, 'Company History', 'https://files.vendori.com/pdf/8502d975-b27b-47c2-bf2d-c72297f9155d.pdf?Expires=1718114543&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvODUwMmQ5NzUtYjI3Yi00N2MyLWJmMmQtYzcyMjk3ZjkxNTVkLnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODExNDU0M319fV19&Signature=F1gzZyEOQcfHugv9oauC-m5-3JnmokAEAHo0gWLnUTgf0IjFe9WL2DkV-a1elc2VJ45Obi1mpD6Q0c5bBZpUDeG4wePrCfGK0gYyins84Ym5bEJUK0AFUlJj1FvpFbWgeBoT9I2w55O26MEpzNA8p46IZ0v8nAxFsCcpLuCiiICgsCdW-sRuG8eq9n~cZOpFdS80VewlKDomsvSjMXhDojFCdo6IPcnYqoWeKS3fw-5M--jIvU1Q3WJT6HhXFMU7fjGSRxe4hl0xILvzPZLuhjBTbPW2VnyhUGhf4jRKH872SB2Mun-iFtnafrag7~JitAzkF3zVpYpgAE8DaFubvg__&Key-Pair-Id=K3W4UV0J4B6YE7', false, 'Optional', true, '2023-06-11 14:02:30.301596 +00:00', '2023-06-11 14:02:30.301596 +00:00', 'Both', 1),
        (7, 'Horizontal Cover', 'https://files.vendori.com/pdf/aa7406c5-b724-49e6-80d6-a2c1f3fad340.pdf?Expires=1718114524&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvYWE3NDA2YzUtYjcyNC00OWU2LTgwZDYtYTJjMWYzZmFkMzQwLnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODExNDUyNH19fV19&Signature=Q8hFdSfo~IiN9sWWq-vkEhIpubx3J3wlrX6YkbdLR7SHyne9ms9SuXFiBhsN-tZm31kZjUTLbBavayVnr04QyZdfqxDBE8YYkSy-m4lO1BYPCkrs2G7VDI6VgrTm9-~FF9GhbmDy8e3xoXVEm0gWMlZMQr0WIAMxNdAlrGEMNKnu68J~l6wcWsjY0V~FuB0iMhtNLt1elQuLHfkVIap65B~ZhFtW9-Yn5AUS7k6lvfRRulypzMr61UWRmMybEJupANKT68AjZVhnSQRiYPO~ni6H7BBwKROhl7lAVonuIG7uKwYH4ZTYpaQ-g26bedyeQUlKPI4MVPWOJcmWv6Q0Cw__&Key-Pair-Id=K3W4UV0J4B6YE7', false, 'Before', true, '2023-06-11 14:02:04.861527 +00:00', '2023-06-11 14:02:04.861527 +00:00', 'Both', 1),
        (8, 'Terms of Service', 'https://files.vendori.com/pdf/20153e35-9f91-440c-b4e5-06dd8ca14588.pdf?Expires=1718114535&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvMjAxNTNlMzUtOWY5MS00NDBjLWI0ZTUtMDZkZDhjYTE0NTg4LnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODExNDUzNX19fV19&Signature=GnbYQAaDFwIwjVwCifv1XeFBwjk0rqIg4FFU6vs8FCtENK3g08llpI3EX6A5bGZbZ78ylk-owdjFzcEyqIH3VdYUrUQxt8~VApj2c0D9xLOZQPobHrbKwCjqGWgYOSdqapqnX5Eh9KnTra9w31FJYNTbudKg8ZJkFwa5muvsFk-7LRNwy5TktFCd7LTrtZv0hIbS8o-dEGW74DSVFaNuB58pny3yAc02dlLAqk4eh5cLsh0v4xBE1GrplnLHVDQAy-Dh73~IxqwxKWzc36~Ilnm-CQFW1-ZXVNvuqHqA90~5GMsHlLPKsqWxYgfWcELWHX7Cd9HBuwOwEjTwz6L4aA__&Key-Pair-Id=K3W4UV0J4B6YE7', false, 'Optional', true, '2023-06-11 14:02:19.100467 +00:00', '2023-06-11 14:02:19.100467 +00:00', 'Both', 1);

insert into oem.oem_notification_preferences (user_id, company_id, change_frequency_type, approval_frequency_type, transaction_frequency_type, submission_frequency_type, daily_frequency_value, weekly_frequency_value, monthly_frequency_value, is_active, is_enabled, created_at, updated_at)
values  (2, 1, 'Immediately', 'Immediately', 'Immediately', 'Immediately', '12:00 PM', 'Monday', '1st day of Month', true, true, '2023-03-02 14:59:42.690033 +00:00', '2023-03-02 14:59:42.690033 +00:00');

insert into oem.oem_pricing_models (pricing_model_id, company_id, model_name, model_type, pricing_type, unit_metric, unit_duration, tiers_enabled, is_enabled, created_at, updated_at)
values  (13, 1, 'Services - Subscription', 'Subscription', 'Flat', 'Hour', 'Per Week', true, true, '2023-04-07 00:23:59.377610 +00:00', '2023-04-07 00:23:59.377610 +00:00'),
        (17, 1, 'Services - Consumption (per hour)', 'Consumption', 'Flat', 'Hour', 'Consumed', true, true, '2023-05-08 14:57:09.961349 +00:00', '2023-05-08 14:57:09.961349 +00:00'),
        (5, 1, 'Software - SaaS', 'Subscription', 'Tiered', 'User', 'Per Calendar Year', true, true, '2023-02-27 17:18:52.815687 +00:00', '2023-02-27 17:18:52.815687 +00:00'),
        (16, 1, 'Software - OnPremise', 'One Time / Non-Recurring', 'Flat', 'User', 'One-Time / Non-Recurring', true, true, '2023-05-08 14:46:55.523499 +00:00', '2023-05-08 14:46:55.523499 +00:00'),
        (18, 1, 'Hardware - One-Time', 'One Time / Non-Recurring', 'Flat', 'Unit', 'One-Time / Non-Recurring', true, true, '2023-05-08 14:57:48.717249 +00:00', '2023-05-08 14:57:48.717249 +00:00');

insert into oem.oem_products (product_id, product_hierarchy_id, owner_user_id, sku_number, product_name, is_enabled, created_at, updated_at, company_id, eligible_for, term, term_type, same_unit_price_for_all_tiers, billing_frequency, custom_billing_frequency_settings, type, bundle_settings, product_availability, pricing_model_id, sf_product_id, sf_price_book_id, display_url, last_modifier_user_id, product_description, product_code)
values  (25, 172, 2, '123456', 'Demo_SaaS-Standard', true, '2023-05-08 14:46:33.658623 +00:00', '2023-05-16 14:59:27.053500 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 3, 'years', true, 'Annually (Calendar)', '{}', 'Product', '[]', '{Current}', 5, null, null, null, null, null, null),
        (31, 188, 2, '12345', 'Demo_Computer', true, '2023-05-16 15:00:28.890986 +00:00', '2023-05-16 15:00:28.890986 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Upfront', '{}', 'Product', '[]', '{Current}', 18, null, null, null, null, null, null),
        (32, 189, 2, '1234', 'Demo_Monitor', true, '2023-05-16 15:01:05.188936 +00:00', '2023-05-16 15:01:05.188936 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Upfront', '{}', 'Product', '[]', '{Current}', 18, null, null, null, null, null, null),
        (33, 190, 2, '123456789', 'Demo_Hourly-Support_Consumption', true, '2023-05-16 15:02:04.181092 +00:00', '2023-05-16 15:02:04.181092 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Annually (Calendar)', '{}', 'Product', '[]', '{Current}', 17, null, null, null, null, null, null),
        (26, 165, 2, '1234567', 'Demo_OnPremise-License', true, '2023-05-08 14:47:32.240970 +00:00', '2023-05-16 15:02:58.957677 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Upfront', '{}', 'Product', '[]', '{Current}', 16, null, null, null, null, null, null),
        (34, 174, 2, '1234567', 'Demo_OnPremise-Maintenance_Standard', true, '2023-05-16 15:03:50.345743 +00:00', '2023-05-16 15:03:50.345743 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Annually (Calendar)', '{}', 'Product', '[]', '{Current}', 5, null, null, null, null, null, null),
        (35, 175, 2, '12345678', 'Demo_OnPremise-Maintenance_Premium', true, '2023-05-16 15:04:47.518475 +00:00', '2023-05-16 15:04:47.518475 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 1, 'years', true, 'Annually (Calendar)', '{}', 'Product', '[]', '{Current}', 5, null, null, null, null, null, null),
        (36, 174, 2, '1234567890', 'Demo_OnPremise_StdBundle', true, '2023-05-16 15:07:09.156745 +00:00', '2023-05-16 15:07:09.156745 +00:00', 1, '{Expansion,Extension,Renewal,Cancellation/Termination}', null, null, null, null, '[]', 'BundleEntity', '[{"productId": 26, "isEditable": true, "defaultQuantity": 1}, {"productId": 34, "isEditable": true, "defaultQuantity": 1}]', '{Current}', null, null, null, null, null, null, null),
        (20, 197, 2, '123456', 'Demo_Nearshore_Architect_1', true, '2023-04-07 13:28:29.376785 +00:00', '2023-05-16 14:57:02.874886 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (22, 198, 2, '123456', 'Demo_Offshore_Architect_1', true, '2023-04-07 13:29:16.340516 +00:00', '2023-05-16 14:57:20.264439 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (19, 194, 2, '123456', 'Demo_Nearshore_Dev_1', true, '2023-04-07 13:28:12.211196 +00:00', '2023-05-16 14:57:35.300697 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (16, 196, 2, '123456', 'Demo_Onshore_Architect_1', true, '2023-04-07 00:32:11.440170 +00:00', '2023-05-16 14:57:45.826580 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (14, 193, 2, '123456', 'Demo_Onshore_Dev_1', true, '2023-04-07 00:25:44.339231 +00:00', '2023-05-16 14:57:55.069240 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (21, 195, 2, '123456', 'Demo_Offshore_Dev_1', true, '2023-04-07 13:28:55.738350 +00:00', '2023-05-16 14:58:04.281558 +00:00', 1, '{Expansion,Extension}', 2, 'months', true, 'Weekly', '{}', 'Product', '[]', '{Current}', 13, null, null, null, null, null, null),
        (37, 186, 2, '1234', 'Demo_Computer-Monitor_Bundle', true, '2023-05-16 15:08:07.482874 +00:00', '2023-05-16 15:08:07.482874 +00:00', 1, '{Expansion,Extension,Renewal,Cancellation/Termination}', null, null, null, null, '[]', 'BundleEntity', '[{"productId": 31, "isEditable": true, "defaultQuantity": 1}, {"productId": 32, "isEditable": true, "defaultQuantity": 1}]', '{Current}', null, null, null, null, null, null, null),
        (30, 173, 2, '123456', 'Demo_SaaS-Premium', true, '2023-05-16 14:59:45.156246 +00:00', '2023-05-30 17:34:38.674096 +00:00', 1, '{Extension,Expansion,Renewal,Cancellation/Termination}', 3, 'years', true, 'Annually (Calendar)', '{}', 'Product', '[]', '{Current}', 5, null, null, null, null, null, null);

insert into oem.oem_products_relationships (product_relationship_id, source_product_id, target_product_id, relationship_type, eligible_type, list_price_type, is_enabled, is_active, created_at, updated_at, company_id)
values  (36, 25, 30, 'Transition', 'Upgrade', 'Full List Price', true, true, '2023-05-16 15:09:12.029243 +00:00', '2023-05-16 15:09:12.029243 +00:00', 1),
        (37, 34, 35, 'Transition', 'Upgrade', 'Full List Price', true, true, '2023-05-16 15:09:36.260754 +00:00', '2023-05-16 15:09:36.260754 +00:00', 1),
        (38, 31, 32, 'Add On', 'Addon', 'Full List Price', true, true, '2023-05-16 15:10:14.722144 +00:00', '2023-05-16 15:10:14.722144 +00:00', 1),
        (39, 30, 33, 'Add On', 'Addon', 'Full List Price', true, true, '2023-05-16 15:10:39.046007 +00:00', '2023-05-16 15:10:39.046007 +00:00', 1);

insert into oem.oem_bundles_products (company_id, product_id, bundle_id)
values  (1, 36, 26),
        (1, 36, 34),
        (1, 37, 31),
        (1, 37, 32);

insert into oem.oem_unit_tiers (unit_tier_id, pricing_model_id, unit_tier_name, start_range, end_range, is_enabled, created_at, updated_at, company_id)
values  (12, 5, 'Tier 3', 301, 400, true, '2023-02-27 17:18:52.824521 +00:00', '2023-02-27 17:18:52.824521 +00:00', 1),
        (13, 5, 'Tier 4', 401, 500, true, '2023-02-27 17:18:52.824521 +00:00', '2023-02-27 17:18:52.824521 +00:00', 1),
        (14, 5, 'Tier 5', 501, 600, true, '2023-02-27 17:18:52.824521 +00:00', '2023-02-27 17:18:52.824521 +00:00', 1),
        (11, 5, 'Tier 2', 206, 300, true, '2023-02-27 17:18:52.824521 +00:00', '2023-02-27 17:18:52.824521 +00:00', 1),
        (10, 5, 'Tier 1', 1, 205, true, '2023-02-27 17:18:52.824521 +00:00', '2023-02-27 17:18:52.824521 +00:00', 1),
        (25, 13, 'Tier 1', 1, 9007199254740991, true, '2023-04-07 00:23:59.547762 +00:00', '2023-04-07 00:23:59.547762 +00:00', 1),
        (35, 16, 'Tier 1', 1, 9007199254740991, true, '2023-05-08 14:46:55.726129 +00:00', '2023-05-08 14:46:55.726129 +00:00', 1),
        (36, 17, 'Tier 1', 1, 9007199254740991, true, '2023-05-08 14:57:10.141604 +00:00', '2023-05-08 14:57:10.141604 +00:00', 1),
        (37, 18, 'Tier 1', 1, 9007199254740991, true, '2023-05-08 14:57:48.910251 +00:00', '2023-05-08 14:57:48.910251 +00:00', 1);

insert into oem.oem_price_tiers (price_tier_id, unit_tier_id, product_id, cogs_unit, price_unit, is_enabled, created_at, updated_at, company_id)
values  (41, 25, 14, 50, 80, true, '2023-04-07 00:25:44.538117 +00:00', '2023-04-07 00:25:44.538117 +00:00', 1),
        (43, 25, 16, 60, 100, true, '2023-04-07 00:32:11.440170 +00:00', '2023-04-07 00:32:11.440170 +00:00', 1),
        (49, 25, 19, 30, 60, true, '2023-04-07 13:28:12.211196 +00:00', '2023-04-07 13:28:12.211196 +00:00', 1),
        (50, 25, 20, 30, 75, true, '2023-04-07 13:28:29.376785 +00:00', '2023-04-07 13:28:29.376785 +00:00', 1),
        (51, 25, 21, 20, 45, true, '2023-04-07 13:28:55.738350 +00:00', '2023-04-07 13:28:55.738350 +00:00', 1),
        (52, 25, 22, 30, 50, true, '2023-04-07 13:29:16.340516 +00:00', '2023-04-07 13:29:16.340516 +00:00', 1),
        (62, 10, 25, 15, 100, true, '2023-05-08 14:46:33.933210 +00:00', '2023-05-08 14:46:33.933210 +00:00', 1),
        (63, 11, 25, 15, 90, true, '2023-05-08 14:46:33.933210 +00:00', '2023-05-08 14:46:33.933210 +00:00', 1),
        (64, 12, 25, 15, 80, true, '2023-05-08 14:46:33.933210 +00:00', '2023-05-08 14:46:33.933210 +00:00', 1),
        (65, 13, 25, 15, 70, true, '2023-05-08 14:46:33.933210 +00:00', '2023-05-08 14:46:33.933210 +00:00', 1),
        (66, 14, 25, 15, 60, true, '2023-05-08 14:46:33.933210 +00:00', '2023-05-08 14:46:33.933210 +00:00', 1),
        (67, 35, 26, 30, 200, true, '2023-05-08 14:47:32.412877 +00:00', '2023-05-08 14:47:32.412877 +00:00', 1),
        (71, 10, 30, 15, 150, true, '2023-05-16 14:59:45.388393 +00:00', '2023-05-16 14:59:45.388393 +00:00', 1),
        (72, 11, 30, 15, 140, true, '2023-05-16 14:59:45.388393 +00:00', '2023-05-16 14:59:45.388393 +00:00', 1),
        (73, 12, 30, 15, 130, true, '2023-05-16 14:59:45.388393 +00:00', '2023-05-16 14:59:45.388393 +00:00', 1),
        (74, 13, 30, 15, 120, true, '2023-05-16 14:59:45.388393 +00:00', '2023-05-16 14:59:45.388393 +00:00', 1),
        (75, 14, 30, 15, 110, true, '2023-05-16 14:59:45.388393 +00:00', '2023-05-16 14:59:45.388393 +00:00', 1),
        (76, 37, 31, 250, 500, true, '2023-05-16 15:00:29.111471 +00:00', '2023-05-16 15:00:29.111471 +00:00', 1),
        (77, 37, 32, 50, 200, true, '2023-05-16 15:01:05.418631 +00:00', '2023-05-16 15:01:05.418631 +00:00', 1),
        (78, 36, 33, 35, 150, true, '2023-05-16 15:02:04.390060 +00:00', '2023-05-16 15:02:04.390060 +00:00', 1),
        (79, 10, 34, 35, 110, true, '2023-05-16 15:03:50.597600 +00:00', '2023-05-16 15:03:50.597600 +00:00', 1),
        (80, 11, 34, 35, 100, true, '2023-05-16 15:03:50.597600 +00:00', '2023-05-16 15:03:50.597600 +00:00', 1),
        (81, 12, 34, 35, 90, true, '2023-05-16 15:03:50.597600 +00:00', '2023-05-16 15:03:50.597600 +00:00', 1),
        (82, 13, 34, 35, 80, true, '2023-05-16 15:03:50.597600 +00:00', '2023-05-16 15:03:50.597600 +00:00', 1),
        (83, 14, 34, 35, 70, true, '2023-05-16 15:03:50.597600 +00:00', '2023-05-16 15:03:50.597600 +00:00', 1),
        (84, 10, 35, 35, 200, true, '2023-05-16 15:04:47.726435 +00:00', '2023-05-16 15:04:47.726435 +00:00', 1),
        (85, 11, 35, 35, 190, true, '2023-05-16 15:04:47.726435 +00:00', '2023-05-16 15:04:47.726435 +00:00', 1),
        (86, 12, 35, 35, 180, true, '2023-05-16 15:04:47.726435 +00:00', '2023-05-16 15:04:47.726435 +00:00', 1),
        (87, 13, 35, 35, 170, true, '2023-05-16 15:04:47.726435 +00:00', '2023-05-16 15:04:47.726435 +00:00', 1),
        (88, 14, 35, 35, 160, true, '2023-05-16 15:04:47.726435 +00:00', '2023-05-16 15:04:47.726435 +00:00', 1);

insert into oem.oem_quote_and_vendo_uuids (quote_and_vendo_uuid_type, company_id, prefix, last_uuid, is_enabled, created_at, updated_at)
values  ('Quote', 1, 'Q-', 1, true, '2023-02-27 17:18:52.916331 +00:00', '2023-02-27 17:18:52.916331 +00:00'),
        ('Vendo', 1, 'V-', 1, true, '2023-02-27 17:18:53.055706 +00:00', '2023-02-27 17:18:53.055706 +00:00');

insert into oem.oem_salesforce_token (salesforce_token_id, company_id, token, is_enabled, issued_at, created_at, updated_at, instance_url)
values  (8, 1, '00D5f000001DUE1!ARsAQAjTWBh.CGByxpLMoza9PoQCYtBG1_CGlnIYK3t4soRSYjEozaUSsGbvLbhqBlaZqg0e5tFPE.N_Udo2NuRIYWS2e5DQ', true, '2023-04-17 19:03:12.293000 +00:00', '2023-04-17 19:03:12.300926 +00:00', '2023-04-17 19:03:12.300926 +00:00', 'https://vendori-dev-ed.my.salesforce.com');

insert into oem.oem_salesforce_integrations (salesforce_integration_id, salesforce_url, company_id, salesforce_client_id, salesforce_client_secret, salesforce_username, salesforce_password, created_at, updated_at, is_enabled, settings)
values  (1, 'https://vendoriinc--dev1.sandbox.my.salesforce.com', 1, '3MVG9ojmGst1I5HNLfHB.7VjlzwZ68sDjt_HvvjiZiNtjaM8GumLnrcMpvyKsmnwWA8tJLj3.dBPFKEKJHYnv', '2F7465DC218BAD573C544913DABB124219BCBDFAB03EAE48A09CF30B10E3DEAF', 'zaid.ali.vendori@10pearls.com.dev1', 'Tenpearls1!', '2023-05-12 15:39:36.298657 +00:00', '2023-05-12 15:39:36.298657 +00:00', true, '{}');

insert into oem.oem_visible_product_fields (visible_product_field_id, company_id, custom_name, list_name, is_enabled, created_at, updated_at)
values  (1, 1, null, 'Gross Margin (%)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00'),
        (2, 1, null, 'Gross Margin ($)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00'),
        (3, 1, null, 'Relative Uplift - Customer Price (%)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00'),
        (4, 1, null, 'Relative Uplift - Customer Price ($)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00'),
        (5, 1, null, 'Relative Uplift - Net Price (%)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00'),
        (6, 1, null, 'Relative Uplift - Net Price ($)', true, '2023-02-27 17:18:52.800201 +00:00', '2023-02-27 17:18:52.800201 +00:00');

insert into oem.oem_roles_visible_product_fields (role_id, visible_product_field_id, created_at, updated_at, is_enabled, company_id, role_visible_product_field_id)
values  (2, 1, '2023-03-01 16:10:18.053342 +00:00', '2023-03-01 16:10:18.053342 +00:00', true, 1, 1);

insert into oem.oem_workflow_rules (workflow_rule_id, company_id, owner_user_id, workflow_rule_name, workflow_rule_logic, is_active, is_catchall, is_enabled, created_at, updated_at, start_date, end_date)
values  (1, 1, 2, 'Catchall - No Approver', '{"antecedent": [{"unit": "value", "scope": "internal-comments-field", "value": "QA", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-submitted-quote", "connectionType": "then", "operationCriteria": "equal-to"}], "consequent": [{"value": [2], "scopeCriteria": "route-for-approval-to"}]}', true, true, true, '2023-02-27 17:18:52.795880 +00:00', '2023-02-27 17:18:52.795880 +00:00', '2023-04-07 00:06:49.766071 +00:00', '2023-04-07 00:06:49.766071 +00:00'),
        (6, 1, 19, 'Workflow rule', '{"antecedent": [{"unit": "the-default-setting", "scope": "internal-comments-field", "value": "", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-submitted-quote", "operationCriteria": "equal-to"}], "consequent": [{"value": [25], "scopeCriteria": "route-for-approval-to"}]}', true, false, false, '2023-05-18 20:34:04.137335 +00:00', '2023-05-18 20:34:04.137335 +00:00', '2023-05-18 20:33:36.328000 +00:00', null),
        (7, 1, 2, 'Demo_SaaSProducts_Over$1m', '{"antecedent": [{"unit": "dollar", "scope": "net-value", "value": "1000000", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-submitted-quote", "operationCriteria": "greater-than"}, {"unit": null, "scope": "the-following-products", "value": [30, 25], "valueTo": null, "matchRule": "contains", "scopeCriteria": "the-same-line-item", "operationCriteria": "equal-to"}], "consequent": [{"value": [2], "scopeCriteria": "route-for-approval-to"}]}', true, false, true, '2023-05-30 17:45:30.419908 +00:00', '2023-05-30 17:45:30.419908 +00:00', '2023-05-30 17:44:18.161000 +00:00', null);

insert into oem.oem_shading_rules (shading_rule_id, company_id, owner_user_id, priority, shading_rule_name, shading_rule_logic, is_active, is_enabled, created_at, updated_at, start_date, end_date)
values  (16, 1, 2, 3, 'Demo_GM_Under25%_Yellow', '{"antecedent": [{"unit": "percent", "scope": "gross-margin", "value": "26", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "less-than"}], "consequent": [{"value": "", "matchRule": "should", "shadingType": "yellow", "scopeCriteria": "the-violating-items-should-highlight"}]}', true, true, '2023-05-30 17:33:02.629457 +00:00', '2023-05-30 17:33:02.629457 +00:00', '2023-05-30 17:32:26.766000 +00:00', null),
        (17, 1, 2, 4, 'Demo_GMUnder0%_Red', '{"antecedent": [{"unit": "percent", "scope": "gross-margin", "value": "0", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "less-than"}], "consequent": [{"value": "", "matchRule": "should", "shadingType": "red", "scopeCriteria": "the-violating-items-should-highlight"}]}', true, true, '2023-05-30 17:33:24.075030 +00:00', '2023-05-30 17:33:24.075030 +00:00', '2023-05-30 17:33:06.786000 +00:00', null),
        (14, 1, 2, 1, 'Demo_QTYOver150_Red', '{"antecedent": [{"unit": "units", "scope": "quantity", "value": "150", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "greater-than"}], "consequent": [{"value": "", "matchRule": "should", "shadingType": "red", "scopeCriteria": "the-violating-items-should-highlight"}]}', true, true, '2023-05-30 17:26:53.811774 +00:00', '2023-05-30 17:26:53.811774 +00:00', '2023-05-30 17:23:53.500000 +00:00', null),
        (15, 1, 2, 2, 'Demo_QtyOver100_Yellow', '{"antecedent": [{"unit": "units", "scope": "quantity", "value": "100", "valueTo": "150", "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "between"}], "consequent": [{"value": "", "matchRule": "should", "shadingType": "yellow", "scopeCriteria": "the-violating-items-should-highlight"}]}', true, true, '2023-05-30 17:30:14.628520 +00:00', '2023-05-30 17:30:14.628520 +00:00', '2023-05-30 17:29:48.913000 +00:00', null),
        (18, 1, 2, 5, 'Demo_InvoiceSched_Yellow', '{"antecedent": [{"unit": "the-default-setting", "scope": "billing-payment-structure", "value": "", "valueTo": null, "matchRule": "contains", "scopeCriteria": "a-line-item-in-a-quote-being-created", "operationCriteria": "not-equal-to"}], "consequent": [{"value": "", "matchRule": "should", "shadingType": "yellow", "scopeCriteria": "all-items-should-highlight", "operationCriteria": null}]}', true, true, '2023-05-31 04:11:31.038856 +00:00', '2023-05-31 04:11:31.038856 +00:00', '2023-05-31 04:10:56.504000 +00:00', null);

-- SELECT t.* FROM
--   oem.oem_hierarchy_levels t
-- ORDER BY
--   hierarchy_type,
--   hierarchy_level_id DESC
-- LIMIT 501;
-- UPDATE oem.oem_hierarchy_levels SET level_name = 'Product LV-3' :: varchar(128) WHERE hierarchy_level_id = 11 :: integer
-- UPDATE oem.oem_hierarchy_levels SET level_name = 'Product LV-4' :: varchar(128) WHERE hierarchy_level_id = 12 :: integer
-- UPDATE oem.oem_hierarchy_levels SET level_name = 'Product LV-2' :: varchar(128) WHERE hierarchy_level_id = 10 :: integer
-- UPDATE oem.oem_hierarchy_levels SET level_name = 'Product LV-1' :: varchar(128) WHERE hierarchy_level_id = 9 :: integer

-- insert into
--   oem.oem_salesforce_integrations (
--     salesforce_integration_id,
--     salesforce_url,
--     company_id,
--     salesforce_client_id,
--     salesforce_client_secret,
--     salesforce_username,
--     salesforce_password,
--     created_at,
--     updated_at,
--     is_enabled,
--     settings
--   )
-- values
--   (
--     1,
--     'https://vendoriinc--dev1.sandbox.my.salesforce.com',
--     1,
--     '3MVG9ojmGst1I5HNLfHB.7VjlzwZ68sDjt_HvvjiZiNtjaM8GumLnrcMpvyKsmnwWA8tJLj3.dBPFKEKJHYnv',
--     '2F7465DC218BAD573C544913DABB124219BCBDFAB03EAE48A09CF30B10E3DEAF',
--     'zaid.ali.vendori@10pearls.com.dev1',
--     'Tenpearls1!',
--     '2023-05-12 15:39:36.298657 +00:00',
--     '2023-05-12 15:39:36.298657 +00:00',
--     true,
--     '{}'
--   );

-- insert into
--   oem.oem_users (notification_email)
-- values
--   ('nickl@bloodandtreasure.com'),
--   ('kostya+spam@bloodandtreasure.com'),
--   ('vadimb@bloodandtreasure.com'),
--   ('rich@bloodandtreasure.com'),
--   ('christine@bloodandtreasure.com'),
--   ('john@bloodandtreasure.com'),
--   ('oscar+vendori+1@bloodandtreasure.com'),
--   ('jovie@bloodandtreasure.com'),
--   ('oscar@bloodandtreasure.com'),
--   ('andy.k@bloodandtreasure.com'),

-- portrait with color default

