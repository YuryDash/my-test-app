import * as React from "react";
import "./RequestFilter.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { COLORS } from "common/colors/colors";
import { ButtonsGroup } from "feature/request-filter/components/buttons-group/ButtonsGroup";
import { SelectorsGroup } from "feature/request-filter/components/selectors-group/SelectorsGroup";
import { Grid } from "@mui/material";
import { DatePick } from "feature/request-filter/components/date-pick/DatePick";
import { useAppDispatch } from "app/store";
import { setDataFiltersAC } from "feature/main/module/data-reducer";
import { Status, QuickTransition } from "feature/main/module/data-types";

export const RequestFilter = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const dispatch = useAppDispatch();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSortRequestCallback = (param: Status | QuickTransition) => {
    dispatch(setDataFiltersAC({keyword: param}))
  };

  return (
    <div>
      <Accordion elevation={0} expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary sx={{ width: "150px" }} expandIcon={<ExpandMoreIcon sx={{ color: COLORS.ORANGE }} />}>
          <Typography sx={{ color: COLORS.ORANGE }}>Фильтр</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container wrap="wrap" gap={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <ButtonsGroup
                buttonValue={{ param1: Status.in_process, param2: Status.processed, param3: Status.unprocessed }}
                callback={handleSortRequestCallback}
                title={"Статус заявки"}
                names={{ first: "В обработке", second: "Обработана", third: "Отклонена" }}
                colors={{ color: COLORS.GRAY, backColor: COLORS.LIGHT_GRAY }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <SelectorsGroup />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <DatePick />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ButtonsGroup
                buttonValue={{ param1: QuickTransition.MONTH, param2: QuickTransition.NOW, param3: QuickTransition.WEEK }}
                callback={handleSortRequestCallback}
                title={"Быстрый переход"}
                names={{ first: "Сегодня", second: "Неделя", third: "Месяц" }}
                colors={{ color: COLORS.ORANGE, backColor: COLORS.LIGHT_GRAY }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
