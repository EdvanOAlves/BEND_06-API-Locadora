DELIMITER $$
CREATE TRIGGER trg_deleta_relacionados_profissional_on_delete
BEFORE DELETE ON tbl_profissional FOR EACH ROW
BEGIN
    DELETE FROM tbl_personagem WHERE profissional_id = OLD.profissional_id;
END$$

CREATE TRIGGER trg_deleta_relacionados_filme_on_delete
BEFORE DELETE ON tbl_filme FOR EACH ROW
BEGIN
    DELETE FROM tbl_personagem WHERE filme_id = OLD.filme_id;
    DELETE FROM tbl_filme_genero WHERE filme_id = OLD.filme_id;
END$$
