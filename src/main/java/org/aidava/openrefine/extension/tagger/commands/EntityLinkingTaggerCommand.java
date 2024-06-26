package org.aidava.openrefine.extension.tagger.commands;

import com.google.refine.browsing.EngineConfig;
import com.google.refine.commands.EngineDependentCommand;
import com.google.refine.model.AbstractOperation;
import com.google.refine.model.Column;
import com.google.refine.model.Project;
import org.aidava.openrefine.extension.tagger.operations.EntityLinkingTaggerOperation;

import javax.servlet.http.HttpServletRequest;

public class EntityLinkingTaggerCommand extends EngineDependentCommand {
    @Override
    protected AbstractOperation createOperation(Project project, HttpServletRequest httpServletRequest, EngineConfig engineConfig) throws Exception {
        final String columnName = httpServletRequest.getParameter("column");
        final Column column = project.columnModel.getColumnByName(columnName);

        final String language = httpServletRequest.getParameter("language");
        if (language == null) {
            throw new Exception("Missing language parameter");
        }
        final String terminology = httpServletRequest.getParameter("terminology");

        if (column == null) {
            throw new Exception("Invalid column name: " + columnName);
        }

        return new EntityLinkingTaggerOperation(
                column.getName(),
                language,
                terminology,
                column.getCellIndex()
        );
    }
}
