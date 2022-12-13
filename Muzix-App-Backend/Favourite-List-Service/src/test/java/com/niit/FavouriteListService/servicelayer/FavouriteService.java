package com.niit.FavouriteListService.servicelayer;
import com.niit.FavouriteListService.domain.Favourite;
import com.niit.FavouriteListService.domain.FavouriteList;
import com.niit.FavouriteListService.repository.FavouriteRepository;
import com.niit.FavouriteListService.services.FavouriteServiceImpl;
import com.niit.MovieService.domain.Movie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class FavouriteService {

    @Mock
    private FavouriteRepository favouriteRepository;

    @InjectMocks
    private FavouriteServiceImpl favouriteService;

    private Movie movie;

    private Favourite favourite;

    private FavouriteList favouriteList;

    @BeforeEach
    void setUp() {
        List<Movie> movieList = new ArrayList<>();
        movieList.add(new Movie(12,"movie2"));
        favouriteList = new FavouriteList("favlist1",movieList);
        List<FavouriteList> favouriteLists = new ArrayList<>();
        favouriteLists.add(favouriteList);
        favourite = new Favourite("Test@749",new ArrayList<>());
    }

    @Test
    public void savefavAccount(){
    when(favouriteRepository.insert(favourite)).thenReturn(favourite);
    when(favouriteRepository.findById(favourite.getEmail())).thenReturn(Optional.ofNullable(favourite));
    assertEquals(favourite,favouriteService.createFavouriteAccount(favourite.getEmail()));
    verify(favouriteRepository,times(1)).insert(favourite);
    verify(favouriteRepository,times(1)).findById(any());
    }

}
