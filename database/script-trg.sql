--------------------------------------------------------------------------------------------------------
--                                          CRIANDO TRIGGERS
--------------------------------------------------------------------------------------------------------


------------------------------
-- Filmes
------------------------------
-- Delete

DELIMITER $$
CREATE TRIGGER trg_delete_movie_genre_relations_on_delete
BEFORE DELETE ON tbl_filme FOR EACH ROW
BEGIN
    DELETE FROM tbl_filme_genero
    WHERE filme_id = OLD.filme_id;
END$$	
DELIMITER ;